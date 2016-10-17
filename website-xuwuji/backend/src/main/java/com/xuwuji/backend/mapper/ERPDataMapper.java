package com.xuwuji.backend.mapper;

import java.util.HashMap;
import java.util.List;

import com.xuwuji.backend.model.ERPData;

public interface ERPDataMapper {

	public List<ERPData> getAll();

	public List<String> getMName();

	public List<String> getMCategory();

	public List<String> getSize();

	public List<String> getParam();

	public List<String> getFactory();

	public List<String> getMId();

	public List<String> getNId();

	public List<ERPData> get(HashMap<String, Object> map);

	public void insert(ERPData data);

}
