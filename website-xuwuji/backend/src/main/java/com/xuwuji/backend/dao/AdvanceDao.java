package com.xuwuji.backend.dao;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xuwuji.backend.repository.AdvanceRepository;
import com.xuwuji.backend.util.TimeUtil;

@Service
public class AdvanceDao {
	@Autowired
	private AdvanceRepository advanceRepository;
	@Autowired
	private ERPDataDao erpDataDao;

	/**
	 * 过去12个月内，每个月的发出数量和购入数量，不包含当月
	 * 
	 * @return
	 */
	public HashMap<String, LinkedHashMap<String, Double>> getBuyAndSentByMonth() {
		LinkedHashMap<String, Double> buyMap = new LinkedHashMap<String, Double>();
		LinkedHashMap<String, Double> sentMap = new LinkedHashMap<String, Double>();
		HashMap<String, LinkedHashMap<String, Double>> map = new HashMap<String, LinkedHashMap<String, Double>>();
		// 当天日期
		Calendar today = Calendar.getInstance();
		int month = today.get(Calendar.MONTH);
		int year = today.get(Calendar.YEAR);
		// 过去12个月，不包含当月
		for (int i = 0; i < 12; i++) {
			Calendar instance = Calendar.getInstance();
			// 上一年
			if (month - 12 <= 0) {
				instance.set(year - 1, month, 1);
			}
			// 当年
			else {
				instance.set(year, month - 12, 1);
			}
			int days = instance.getActualMaximum(Calendar.DATE);
			DateTime firstDayOfMonth = new DateTime(instance.getTime());
			DateTime lastDayOfMonth = new DateTime(instance.getTime()).plusDays(days - 1);
			// System.out.println("first"+firstDayOfMonth);
			// System.out.println("last"+lastDayOfMonth);
			month++;
			HashMap<String, Object> result = advanceRepository.getNumVsMonth(
					TimeUtil.getSimpleDateTime(firstDayOfMonth), TimeUtil.getSimpleDateTime(lastDayOfMonth));
			if (result == null) {
				continue;
			}
			System.out.println(result);
			for (Entry<String, Object> entry : result.entrySet()) {
				System.out.println(entry.getKey());
				System.out.println(entry.getValue());
			}
			String time = instance.get(Calendar.YEAR) + "-" + instance.get(Calendar.MONTH);
			buyMap.put(time, ((BigDecimal) result.get("buyNum")).doubleValue());
			sentMap.put(time, (Double) result.get("sentNum"));
		}
		map.put("sentNum", sentMap);
		map.put("buyNum", buyMap);
		System.out.println(map);
		return map;
	}

	/**
	 * 先选某个月，之后把每一个材料类型数值（购入数）体现出来，柱状图
	 * 
	 * @param month
	 */
	public HashMap<String, Double> getNumByCategoryAndMonth(String startDate, String endDate) {
		// 所有材料类型
		List<String> mCategories = erpDataDao.getInfo().get("mCategory");
		HashMap<String, Double> result = new HashMap<String, Double>();
		for (String mCategory : mCategories) {
			System.out.println(mCategory);
			HashMap<String, Object> map = advanceRepository.getBuySumByMCategoryAndMonth(mCategory, startDate, endDate);
			// 有的材料类型在这段时间内没有购入数量
			if (map == null) {
				continue;
			}
			// for (Entry<String, Object> entry : map.entrySet()) {
			// System.out.println(entry.getKey());
			// System.out.println(entry.getValue());
			// }
			result.put(mCategory, ((BigDecimal) map.get("sum")).doubleValue());
		}
		System.out.println(result);
		return result;
	}

	public static void main(String[] args) {
		AdvanceDao dao = new AdvanceDao();
		dao.getBuyAndSentByMonth();
	}

}
