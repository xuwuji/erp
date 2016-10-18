package com.xuwuji.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseBody
	public List<ERPData> getAll() {
		return dao.getAll();
	}

	@CrossOrigin
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, List<String>> getInfo() {
		if (infoCache.size() == 0) {
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

}
