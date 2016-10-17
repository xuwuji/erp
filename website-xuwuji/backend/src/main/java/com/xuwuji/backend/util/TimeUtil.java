package com.xuwuji.backend.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class TimeUtil {

	public static DateTimeFormatter getSimpleDateFormatter() {
		return DateTimeFormat.forPattern("yyyy-MM-dd");
	}

	public static String getSimpleDateTime(DateTime time) {
		String result = time.toString(getSimpleDateFormatter());
		return result;
	}
	
	

}
