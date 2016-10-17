package com.xuwuji.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RestResponse {
	public static final int SUCCESS_CODE = 0;
	private int code;
	private String errorMessage = "";
	private Object resp;

	private RestResponse() {
	};

	public static RestResponse goodResponse(Object resp) {
		RestResponse rr = new RestResponse();
		rr.code = SUCCESS_CODE;
		rr.resp = resp;
		rr.errorMessage = "no error";
		return rr;
	}

	public static RestResponse errorResponse(ErrorCode err, Object resp) {
		return errorResponse(err.getValue(), err.getMsg(), resp);
	}

	public static RestResponse errorResponse(int errorCode, String errorMessage, Object resp) {
		assert (errorCode != 0);
		RestResponse rr = new RestResponse();
		rr.code = errorCode;
		rr.errorMessage = errorMessage;
		rr.resp = resp;
		return rr;
	}

	public int getCode() {
		return code;
	}

	@JsonProperty(value = "error_message")
	public String getErrorMessage() {
		return errorMessage;
	}

	public Object getResp() {
		return resp;
	}

	public static RestResponse LOGIN_ERROR = RestResponse.errorResponse(ErrorCode.LOGIN_NEEDED, "");
	public static RestResponse INVALID_TOKEN = RestResponse.errorResponse(ErrorCode.INVALID_TOKEN, "");
}
