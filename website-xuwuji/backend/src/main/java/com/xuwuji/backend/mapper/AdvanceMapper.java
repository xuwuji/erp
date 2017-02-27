package com.xuwuji.backend.mapper;

import java.util.HashMap;

public interface AdvanceMapper {

	// 得到每个月的发出数量和购入数量
	public HashMap<String, Object> getNumVsMonth(HashMap<String, String> map);

	// 根据某段时间内，一种材料类型的发出总数
	public HashMap<String, Object> getBuySumByMCategoryAndMonth(HashMap<String, Object> map);
}
