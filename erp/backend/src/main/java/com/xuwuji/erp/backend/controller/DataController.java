package com.xuwuji.erp.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xuwuji.erp.backend.dao.ERPDataDao;
import com.xuwuji.erp.backend.model.ERPData;

@Controller
@RequestMapping(value = "/data")
public class DataController {

	@Autowired
	private ERPDataDao dao;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseBody
	public List<ERPData> getAll() {
		System.out.println("dsdd");
		return dao.getAll();

	}

}
