package com.xuwuji.backend.model;

/**
 * Created by wenliu2 on 12/17/15.
 */
public enum ErrorCode {
    INVALID_INPUT(422, "Invalid Input"),
    NOT_FOUND(404, "Not Found"),
    LOGIN_NEEDED(-100, "Login Needed"),
	DATA_ACCESS_EXCEPTION(1001, "Data Access Exception"),
	KYLIN_TIME_OUT(1002, "Kylin Gateway Time-out"),
	GRO_SERVER_ERROR(1003, "Server Error!"),
    INVALID_TOKEN(1004, "Invalid Token"),
	DATABASE_CONNECTION_FAILURE(1005, "Error! Failed setup connection with database. please try again later or report the error now."),
	GET_DATA_FROM_DATABASE_TIMEOUT(1006, "Warning! The request has time-out. You can try again later, or report the issue if it happens again."),
	GET_DATA_FROM_DATABASE_TIMEOUT_SUBCATEGORY(1006, "Warning! Sub-category data request has time-out. You can try again later, or report the issue if it happens again."),
	DATA_EXCEPTION(1007,"Error! Some fields failed to acquire value from server. please try again later or report the error now.");
    private int value;
    private String msg;
    ErrorCode(int value, String msg){
        this.value = value;
        this.msg = msg;
    }

    public int getValue(){
        return value;
    }
    public String getMsg() {
        return msg;
    }
}
