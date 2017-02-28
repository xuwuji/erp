package com.xuwuji.backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.joda.time.DateTime;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.xuwuji.backend.dao.ERPDataDao;
import com.xuwuji.backend.model.ERPData;
import com.xuwuji.backend.model.ErrorCode;
import com.xuwuji.backend.model.RestResponse;
import com.xuwuji.backend.util.ControllerUtil;
import com.xuwuji.backend.util.DownloadUtil;
import com.xuwuji.backend.util.TimeUtil;

@Controller
@RequestMapping(value = "/data")
public class DataController {
	@Autowired
	private ERPDataDao dao;
	@Autowired
	private ControllerUtil controllerUtil;

	// cache for reading data
	private LoadingCache<String, List<ERPData>> dataCache = CacheBuilder.newBuilder().maximumSize(500)
			.expireAfterWrite(10, TimeUnit.MINUTES).build(new CacheLoader<String, List<ERPData>>() {
				@Override
				public List<ERPData> load(String query) throws Exception {
					return dao.get(query);
				}
			});

	private HashMap<String, List<String>> infoCache = new HashMap<String, List<String>>();
	private static HashMap<String, List<ERPData>> downloadMap = new HashMap<String, List<ERPData>>();
	private static ConcurrentHashMap<String, Integer> downloadMapCount = new ConcurrentHashMap<String, Integer>();

	/**
	 * get all data from db
	 * 
	 * @return
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseBody
	public List<ERPData> getAll() {
		/**
		 * clear the download cache, if the data has already been download, then
		 * remove it from the cache
		 */
		for (Entry<String, Integer> entry : downloadMapCount.entrySet()) {
			if (entry.getValue() != 0) {
				downloadMapCount.remove(entry.getKey());
			}
		}
		return dao.getAll();
	}

	/**
	 * get info of data from db
	 * 
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, List<String>> getInfo() {
		if (infoCache == null || infoCache.size() == 0) {
			infoCache = dao.getInfo();
		}
		return infoCache;
	}

	/**
	 * get data from db based on query criteria
	 * 
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/get", method = RequestMethod.POST)
	@ResponseBody
	public List<ERPData> get(@RequestBody String json) throws Exception {
		/**
		 * clear the download cache, if the data has already been download, then
		 * remove it from the cache
		 */
		for (Entry<String, Integer> entry : downloadMapCount.entrySet()) {
			if (entry.getValue() != 0) {
				downloadMapCount.remove(entry.getKey());
			}
		}
		return dataCache.get(json);
	}

	/**
	 * get a record based on id
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/get/id/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ERPData getById(@PathVariable String id) throws Exception {
		return dao.getById(id);
	}

	/**
	 * update one record based on the its current data
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse update(@RequestBody String json) {
		try {
			dao.update(json);
			return RestResponse.goodResponse("ok");
		} catch (JSONException e) {
			e.printStackTrace();
			String errorMessage = e.getMessage();
			errorMessage = controllerUtil.translateErrorMessage(errorMessage);
			return RestResponse.errorResponse(ErrorCode.INVALID_INPUT, errorMessage);
		} catch (Exception e) {
			e.printStackTrace();
			String errorMessage = e.getMessage();
			errorMessage = controllerUtil.translateErrorMessage(errorMessage);
			return RestResponse.errorResponse(ErrorCode.DATA_EXCEPTION, errorMessage);
		}
	}

	/**
	 * insert one record into db
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insert(@RequestBody String json) {
		System.out.println(json);
		try {
			dao.insert(json);
			infoCache.clear();
			dataCache.cleanUp();
			infoCache = dao.getInfo();
			return RestResponse.goodResponse("ok");
		} catch (JSONException e) {
			e.printStackTrace();
			return RestResponse.errorResponse(ErrorCode.INVALID_INPUT, e.getMessage());
		}
	}

	/**
	 * prepare for downloading data in excel format
	 * 
	 * @param json
	 * @return
	 * @throws ExecutionException
	 */
	@RequestMapping(value = "/download/prepare", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse prepareDownload(@RequestBody String json) throws ExecutionException {
		List<ERPData> list = dataCache.get(json);
		@SuppressWarnings("static-access")
		String key = TimeUtil.getCurrentTime(new DateTime().now());
		downloadMap.put(key, list);
		downloadMapCount.put(key, 0);
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return RestResponse.goodResponse(key);
	}

	/**
	 * download data
	 * 
	 * @param request
	 * @param response
	 * @param key
	 * @throws IOException
	 */
	@SuppressWarnings("static-access")
	@RequestMapping(value = "/download/get/{key}", method = RequestMethod.GET)
	public void downloadFromDB(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("key") String key) throws IOException {
		List<ERPData> list = downloadMap.get(key);
		downloadMapCount.put(key, downloadMapCount.get(key) + 1);
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition",
				String.format("attachment;filename=\"%s\"", TimeUtil.getSimpleDateTime(new DateTime().now()) + ".xls"));
		Workbook wb = new HSSFWorkbook();
		Sheet sheet = wb.createSheet("数据总表");
		Row row = sheet.createRow((short) 0);
		// information row
		Cell C_DATE = row.createCell(0);
		C_DATE.setCellValue(ERPData.C_DATE);
		Cell C_MID = row.createCell(1);
		C_MID.setCellValue(ERPData.C_MID);
		Cell C_MCATEGORY = row.createCell(2);
		C_MCATEGORY.setCellValue(ERPData.C_MCATEGORY);
		Cell C_MNAME = row.createCell(3);
		C_MNAME.setCellValue(ERPData.C_MNAME);
		Cell C_SIZE = row.createCell(4);
		C_SIZE.setCellValue(ERPData.C_SIZE);
		Cell C_PARAM = row.createCell(5);
		C_PARAM.setCellValue(ERPData.C_PARAM);
		Cell C_BUYNUM = row.createCell(6);
		C_BUYNUM.setCellValue(ERPData.C_BUYNUM);
		Cell C_SENTNUM = row.createCell(7);
		C_SENTNUM.setCellValue(ERPData.C_SENTNUM);
		Cell C_INVENTORY = row.createCell(8);
		C_INVENTORY.setCellValue(ERPData.C_INVENTORY);
		Cell C_ORDERID = row.createCell(9);
		C_ORDERID.setCellValue(ERPData.C_ORDERID);
		Cell C_NID = row.createCell(10);
		C_NID.setCellValue(ERPData.C_NID);
		Cell C_PRICENOTAX = row.createCell(11);
		C_PRICENOTAX.setCellValue(ERPData.C_PRICENOTAX);
		Cell C_AMOUNTNOTAX = row.createCell(12);
		C_AMOUNTNOTAX.setCellValue(ERPData.C_AMOUNTNOTAX);
		Cell C_TAX = row.createCell(13);
		C_TAX.setCellValue(ERPData.C_TAX);
		Cell C_TAXRATE = row.createCell(14);
		C_TAXRATE.setCellValue(ERPData.C_TAXRATE);
		Cell C_TOTAL = row.createCell(15);
		C_TOTAL.setCellValue(ERPData.C_TOTAL);
		Cell C_FACTORY = row.createCell(16);
		C_FACTORY.setCellValue(ERPData.C_FACTORY);
		// Cell C_REQUESTDATE = row.createCell(16);
		// C_REQUESTDATE.setCellValue(ERPData.C_REQUESTDATE);
		// put the data into the xls
		for (int i = 0; i < list.size(); i++) {
			Row dataRow = sheet.createRow((short) (i + 1));
			dataRow.createCell(0).setCellValue(list.get(i).getDate());
			dataRow.createCell(1).setCellValue(list.get(i).getmId());
			dataRow.createCell(2).setCellValue(list.get(i).getmCategory());
			dataRow.createCell(3).setCellValue(list.get(i).getmName());
			dataRow.createCell(4).setCellValue(list.get(i).getSize());
			dataRow.createCell(5).setCellValue(list.get(i).getParam());
			double buyNum = 0;
			double sentNum = 0;
			try {
				buyNum = Double.valueOf(list.get(i).getBuyNum());
				dataRow.createCell(6).setCellValue(buyNum);
			} catch (Exception e) {
				dataRow.createCell(6).setCellValue(buyNum);
			}
			try {
				sentNum = Double.valueOf(list.get(i).getSentNum());
				dataRow.createCell(7).setCellValue(sentNum);
			} catch (Exception e) {
				dataRow.createCell(7).setCellValue(sentNum);
			}
			dataRow.createCell(8).setCellValue(Math.abs(buyNum - sentNum));
			dataRow.createCell(9).setCellValue(list.get(i).getOrderId());
			dataRow.createCell(10).setCellValue(list.get(i).getnId());
			dataRow.createCell(11)
					.setCellValue(Double.valueOf(list.get(i).getPriceNoTax().replaceAll(",", "").replace("-", "0")));
			dataRow.createCell(12)
					.setCellValue(Double.valueOf(list.get(i).getAmoutNoTax().replaceAll(",", "").replace("-", "0")));
			dataRow.createCell(13)
					.setCellValue(Double.valueOf(list.get(i).getTax().replaceAll(",", "").replace("-", "0")));
			dataRow.createCell(14).setCellValue(list.get(i).getTaxRate());
			dataRow.createCell(15)
					.setCellValue(Double.valueOf(list.get(i).getTotal().replaceAll(",", "").replace("-", "0")));
			dataRow.createCell(16).setCellValue(list.get(i).getFactory());
			// dataRow.createCell(16).setCellValue(list.get(i).getRequestDate());
		}
		// write workbook to outputstream
		DownloadUtil.exportExcel(request, response, wb);
	}

	/**
	 * delete one record based on id
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse deleteRecord(@PathVariable("id") String id) {
		try {
			dao.delete(id);
			return RestResponse.goodResponse("id");
		} catch (Exception e) {
			return RestResponse.errorResponse(ErrorCode.DATA_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 数据录入时，检查是否此材料单号已经输入过，若有，则把其他填过的信息补全
	 * 
	 * @param mId
	 * @return
	 */
	@RequestMapping(value = "/check", method = RequestMethod.GET)
	@ResponseBody
	public ERPData checkMId(@RequestParam(value = "mId") String mId) {
		return dao.getByMId(mId);
	}

}
