package com.xuwuji.backend.repository;

import java.util.HashMap;
import java.util.Map.Entry;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.xuwuji.backend.mapper.AdvanceMapper;
import com.xuwuji.backend.util.SessionFactory;

@Repository
public class AdvanceRepository {

	/**
	 * 得到每个月的购入总数和发出总数
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public HashMap<String, Object> getNumVsMonth(String startDate, String endDate) {
		SqlSession session = SessionFactory.openDEVSession();
		AdvanceMapper mapper = session.getMapper(AdvanceMapper.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		try {
			return mapper.getNumVsMonth(map);
		} finally {
			session.close();
		}
	}

	/**
	 * 根据某段时间内，一种材料类型的发出总数
	 * 
	 * @param mCatgory
	 * @param month
	 */
	public HashMap<String, Object> getBuySumByMCategoryAndMonth(String mCategory, String startDate, String endDate) {
		SqlSession session = SessionFactory.openDEVSession();
		AdvanceMapper mapper = session.getMapper(AdvanceMapper.class);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("mCategory", mCategory);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		try {
			return mapper.getBuySumByMCategoryAndMonth(map);
		} finally {
			session.close();
		}
	}

	public static void main(String[] args) {
		AdvanceRepository repo = new AdvanceRepository();
		for (Entry<String, Object> entry : repo.getNumVsMonth("2016-10-01", "2016-10-31").entrySet()) {
			System.out.println(entry.getKey());
			System.out.println(entry.getValue());
		}

	}
}
