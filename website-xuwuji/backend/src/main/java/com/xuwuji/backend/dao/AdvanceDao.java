package com.xuwuji.backend.dao;

import java.util.Calendar;
import java.util.HashMap;

import org.joda.time.DateTime;

import com.xuwuji.backend.repository.AdvanceRepository;
import com.xuwuji.backend.util.TimeUtil;

public class AdvanceDao {

	public AdvanceRepository advanceRepository;

	public HashMap<String, Long> getBuyAndSentByMonth() {
		HashMap<String, Long> map = new HashMap<String, Long>();
		// 当天日期
		Calendar today = Calendar.getInstance();
		int month = today.get(Calendar.MONTH);
		int year = today.get(Calendar.YEAR);
		// 过去12个月
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
			DateTime lastDayOfMonth = new DateTime(instance.getTime()).plusDays(days);
			month++;
			long num = advanceRepository.getNumVsMonth(TimeUtil.getSimpleDateTime(firstDayOfMonth),
					TimeUtil.getSimpleDateTime(lastDayOfMonth));
			String time=instance.get(Calendar.YEAR)+"-"+instance.get(Calendar.MONTH);
			map.put(time, num);
		}
		return map;
	}

}
