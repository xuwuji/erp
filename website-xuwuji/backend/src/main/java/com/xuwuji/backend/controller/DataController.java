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
import org.apache.poi.ss.usermodel.CreationHelper;
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

	@CrossOrigin
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, List<String>> getInfo() {
		if (infoCache == null || infoCache.size() == 0) {
			infoCache = dao.getInfo();
		}
		return infoCache;

	}

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

	@RequestMapping(value = "/get/id/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ERPData getById(@PathVariable String id) throws Exception {
		return dao.getById(id);
	}

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

	@SuppressWarnings("resource")
	@RequestMapping(value = "/download/get/{key}", method = RequestMethod.GET)
	public void downloadFromDB(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("key") String key) throws IOException {
		List<ERPData> list = downloadMap.get(key);
		downloadMapCount.put(key, downloadMapCount.get(key) + 1);
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition",
				String.format("attachment;filename=\"%s\"", TimeUtil.getSimpleDateTime(new DateTime().now()) + ".xls"));
		Workbook wb = new HSSFWorkbook();
		CreationHelper createHelper = wb.getCreationHelper();
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
		Cell C_ORDERID = row.createCell(8);
		C_ORDERID.setCellValue(ERPData.C_ORDERID);
		Cell C_NID = row.createCell(9);
		C_NID.setCellValue(ERPData.C_NID);
		Cell C_PRICENOTAX = row.createCell(10);
		C_PRICENOTAX.setCellValue(ERPData.C_PRICENOTAX);
		Cell C_AMOUNTNOTAX = row.createCell(11);
		C_AMOUNTNOTAX.setCellValue(ERPData.C_AMOUNTNOTAX);
		Cell C_TAX = row.createCell(12);
		C_TAX.setCellValue(ERPData.C_TAX);
		Cell C_TAXRATE = row.createCell(13);
		C_TAXRATE.setCellValue(ERPData.C_TAXRATE);
		Cell C_TOTAL = row.createCell(14);
		C_TOTAL.setCellValue(ERPData.C_TOTAL);
		Cell C_FACTORY = row.createCell(15);
		C_FACTORY.setCellValue(ERPData.C_FACTORY);
		Cell C_REQUESTDATE = row.createCell(16);
		C_REQUESTDATE.setCellValue(ERPData.C_REQUESTDATE);

		// put the data into the xls
		for (int i = 0; i < list.size(); i++) {
			Row dataRow = sheet.createRow((short) (i + 1));
			dataRow.createCell(0).setCellValue(list.get(i).getDate());
			dataRow.createCell(1).setCellValue(list.get(i).getmId());
			dataRow.createCell(2).setCellValue(list.get(i).getmCategory());
			dataRow.createCell(3).setCellValue(list.get(i).getmName());
			dataRow.createCell(4).setCellValue(list.get(i).getSize());
			dataRow.createCell(5).setCellValue(list.get(i).getParam());
			dataRow.createCell(6).setCellValue(list.get(i).getBuyNum());
			dataRow.createCell(7).setCellValue(list.get(i).getSentNum());
			dataRow.createCell(8).setCellValue(list.get(i).getOrderId());
			dataRow.createCell(9).setCellValue(list.get(i).getnId());
			dataRow.createCell(10).setCellValue(list.get(i).getPriceNoTax());
			dataRow.createCell(11).setCellValue(list.get(i).getAmoutNoTax());
			dataRow.createCell(12).setCellValue(list.get(i).getTax());
			dataRow.createCell(13).setCellValue(list.get(i).getTaxRate());
			dataRow.createCell(14).setCellValue(list.get(i).getTotal());
			dataRow.createCell(15).setCellValue(list.get(i).getFactory());
			dataRow.createCell(16).setCellValue(list.get(i).getRequestDate());
		}

		// write workbook to outputstream
		DownloadUtil.exportExcel(request, response, wb);
	}

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

}
