package com.xuwuji.backend.util;

import java.util.Map.Entry;

import org.springframework.stereotype.Service;

import com.xuwuji.backend.model.ERPData;

@Service
public class ControllerUtil {
	public String translateErrorMessage(String errorMessage) {
		for (Entry<String, String> entry : ERPData.CN_US.entrySet()) {
			// System.out.println(errorMessage);
			// System.out.println(entry.getKey());
			if (errorMessage.indexOf(entry.getKey()) != -1) {
				errorMessage = errorMessage.replace(entry.getKey(), entry.getValue());
				break;
			}
		}
		return errorMessage;
	}
}
