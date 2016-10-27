package com.xuwuji.backend.util;

import org.apache.poi.ss.usermodel.Workbook;

public interface ExcelUtil<T> {

	public Workbook exportExcel(T data);

}
