package com.xuwuji.erp.backend.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import com.xuwuji.erp.backend.mapper.ERPDataMapper;
import com.xuwuji.erp.backend.model.ERPData;
import com.xuwuji.erp.backend.util.SessionFactory;

@Service
public class ERPDataDao {

	public List<ERPData> getAll() {
		SqlSession session = SessionFactory.openDEVSession();
		try {
			ERPDataMapper mapper = session.getMapper(ERPDataMapper.class);
			System.out.println(mapper.getAll());
			return mapper.getAll();
		} catch (Exception e) {
			System.out.println("exce");
			e.printStackTrace();
			session.rollback();
			return null;
		} finally {
			System.out.println("close");
			session.close();
		}
	}

	public static void main(String[] args) {
		ERPDataDao dao = new ERPDataDao();
		dao.getAll();
	}
}
