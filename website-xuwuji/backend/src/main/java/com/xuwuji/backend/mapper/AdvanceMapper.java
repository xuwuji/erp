package com.xuwuji.backend.mapper;

import java.util.HashMap;

public interface AdvanceMapper {

	// 得到每个月的发出数量和购入数量
	public HashMap<String,Long> getNumVsMonth(HashMap<String, String> map);
}
