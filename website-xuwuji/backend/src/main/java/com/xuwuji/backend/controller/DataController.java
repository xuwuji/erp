package com.xuwuji.backend.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@Controller
@RequestMapping(value = "/data")
public class DataController {

	@Autowired
	private ERPDataDao dao;

	private LoadingCache<String, List<ERPData>> dataCache = CacheBuilder.newBuilder().maximumSize(500)
			.expireAfterWrite(10, TimeUnit.MINUTES).build(new CacheLoader<String, List<ERPData>>() {
				@Override
				public List<ERPData> load(String query) throws Exception {
					return dao.get(query);
				}
			});

	private HashMap<String, List<String>> infoCache = new HashMap<String, List<String>>();
	private static final int BUFFER_SIZE = 409600000;
	private static final String CONTENT_TYPE = "application/octet-stream";

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseBody
	public List<ERPData> getAll() {
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
		return dataCache.get(json);
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

	@RequestMapping(value = "/db", method = RequestMethod.GET)
	public void downloadFromDB(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType(CONTENT_TYPE);
		response.setHeader("Content-Disposition", String.format("attachment;filename=\"%s\"", "12"));
		// System.out.println(json);
		try {
			InputStream is = new ByteArrayInputStream("21312".getBytes());
			OutputStream os = response.getOutputStream();
			byte[] buffer = new byte[BUFFER_SIZE];
			while ((is.read(buffer)) != -1) {
				os.write(buffer, 0, is.read(buffer));
			}
			os.flush();
			is.close();
			// response.getOutputStream().flush();
		} catch (Exception e) {
			// logger.error("Download file error:" + e.getMessage());
			// return RestResponse.errorResponse(-1, "Download file error!",
			// null);
		}
		// return RestResponse.goodResponse(null);
		// HttpHeaders header = new HttpHeaders();
		// header.setContentType(new MediaType("application", "pdf"));
		// header.set("Content-Disposition", "inline; filename=12" );
		// //header.setContentLength(document.length);
		// return new HttpEntity<byte[]>(json.getBytes(), header);
	}

}
