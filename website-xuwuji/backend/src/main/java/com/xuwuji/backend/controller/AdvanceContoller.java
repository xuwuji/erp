package com.xuwuji.backend.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xuwuji.backend.dao.AdvanceDao;

@Controller
@RequestMapping(value = "/advance")
public class AdvanceContoller {

	@Autowired
	private AdvanceDao advanceDao;

	@RequestMapping(value = "/NumVsMonth")
	public HashMap<String, LinkedHashMap<String, Long>> getNumVsMonth() {
		HashMap<String, LinkedHashMap<String, Long>> map = advanceDao.getBuyAndSentByMonth();
		return map;
	}

}
