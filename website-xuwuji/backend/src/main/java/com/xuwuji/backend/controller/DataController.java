package com.xuwuji.backend.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xuwuji.backend.dao.ERPDataDao;
import com.xuwuji.backend.model.ERPData;

@Controller
@RequestMapping(value = "/data")
public class DataController {

	@Autowired
	private ERPDataDao dao;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseBody
	public List<ERPData> getAll() {
		System.out.println("dao.getAll()");
		return dao.getAll();
	}

	@RequestMapping(value = "/info", method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, List<String>> getInfo() {
		return dao.getInfo();

	}

	@RequestMapping(value = "/get", method = RequestMethod.POST)
	@ResponseBody
	public List<ERPData> get(@RequestBody String json) throws Exception {
		System.out.println(json);
		System.out.println(dao.get(json));
		return dao.get(json);

		// return null;
		// System.out.println(json);
	}

}
