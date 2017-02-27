package com.xuwuji.backend.repository;

import org.apache.ibatis.session.SqlSession;

import com.xuwuji.backend.mapper.AdvanceMapper;
import com.xuwuji.backend.util.SessionFactory;

public class AdvanceRepository {

	public long getNumVsMonth(String startDate, String endDate) {
		SqlSession session = SessionFactory.openDEVSession();
		AdvanceMapper mapper=session.getMapper(AdvanceMapper.class);
		try{
			return mapper.getNumVsMonth(startDate, endDate);
		}finally{
			session.close();
		}
	}

}
