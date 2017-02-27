package com.xuwuji.backend.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.xuwuji.backend.dao.AdvanceDao;

@Controller
@RequestMapping(value = "/advance")
public class AdvanceContoller {

	@Autowired
	private AdvanceDao advanceDao;

	/**
	 * 得到每个月的发出数量和购入数量
	 * 
	 * @return
	 */
	@RequestMapping(value = "/NumVsMonth")
	public HashMap<String, LinkedHashMap<String, Double>> getNumVsMonth() {
		HashMap<String, LinkedHashMap<String, Double>> map = advanceDao.getBuyAndSentByMonth();
		return map;
	}

	/**
	 * 根据某段时间内，一种材料类型的发出总数
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	@RequestMapping(value = "/SumByMCategoryAndMonth")
	public HashMap<String, Double> getBuySumByMCategoryAndMonth(@RequestParam(value = "startDate") String startDate,
			@RequestParam(value = "endDate") String endDate) {
		HashMap<String, Double> map = advanceDao.getNumByCategoryAndMonth(startDate, endDate);
		return map;
	}

}
