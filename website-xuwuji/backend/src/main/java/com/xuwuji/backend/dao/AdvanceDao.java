package com.xuwuji.backend.dao;

import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xuwuji.backend.repository.AdvanceRepository;
import com.xuwuji.backend.util.TimeUtil;

@Service
public class AdvanceDao {
	@Autowired
	private AdvanceRepository advanceRepository;

	/**
	 * 过去12个月内，每个月的发出数量和购入数量，不包含当月
	 * 
	 * @return
	 */
	public HashMap<String, LinkedHashMap<String, Long>> getBuyAndSentByMonth() {
		LinkedHashMap<String, Long> buyMap = new LinkedHashMap<String, Long>();
		LinkedHashMap<String, Long> sentMap = new LinkedHashMap<String, Long>();
		HashMap<String, LinkedHashMap<String, Long>> map = new HashMap<String, LinkedHashMap<String, Long>>();
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
			HashMap<String, Long> result = advanceRepository.getNumVsMonth(TimeUtil.getSimpleDateTime(firstDayOfMonth),
					TimeUtil.getSimpleDateTime(lastDayOfMonth));
			String time = instance.get(Calendar.YEAR) + "-" + instance.get(Calendar.MONTH);
			buyMap.put(time, result.get("buyNum"));
			sentMap.put(time, result.get("sentNum"));
		}
		map.put("sentNum", sentMap);
		map.put("buyNum", buyMap);
		return map;
	}

	public AdvanceRepository getAdvanceRepository() {
		return advanceRepository;
	}

	public void setAdvanceRepository(AdvanceRepository advanceRepository) {
		this.advanceRepository = advanceRepository;
	}

	public static void main(String[] args) {
		AdvanceDao dao = new AdvanceDao();
		dao.getBuyAndSentByMonth();
	}

}
