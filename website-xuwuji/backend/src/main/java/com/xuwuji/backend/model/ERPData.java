package com.xuwuji.backend.model;

public class ERPData {
	private int id;
	private String date;
	private String mId;
	private String mCategory;
	private String mName;
	private String size;
	private String param;
	private int buyNum;
	private String sentNum;
	private String orderId;
	private String nId;
	private String priceNotax;
	private String amoutNoTax;
	private String tax;
	private String taxRate;
	private String total;
	private String factory;
	private String requestDate;

	public static final String ID = "id";
	public static final String DATE = "date";
	public static final String MID = "mId";
	public static final String MCATEGORY = "mCategory";
	public static final String MNAME = "mName";
	public static final String SIZE = "size";
	public static final String PARAM = "param";
	public static final String BUYNUM = "buyNum";
	public static final String SENDNUM = "sentNum";
	public static final String ORDERID = "orderId";
	public static final String NID = "nId";
	public static final String PRICENOTAX = "priceNotax";
	public static final String AMOUNTNOTAX = "amoutNoTax";
	public static final String TAX = "tax";
	public static final String TAXRATE = "taxRate";
	public static final String TOTAL = "total";
	public static final String FACTORY = "factory";
	public static final String REQUESTDATE = "requestDate";

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getmId() {
		return mId;
	}

	public void setmId(String mId) {
		this.mId = mId;
	}

	public String getmCategory() {
		return mCategory;
	}

	public void setmCategory(String mCategory) {
		this.mCategory = mCategory;
	}

	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public String getSentNum() {
		return sentNum;
	}

	public void setSentNum(String sentNum) {
		this.sentNum = sentNum;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getnId() {
		return nId;
	}

	public void setnId(String nId) {
		this.nId = nId;
	}

	public String getPriceNotax() {
		return priceNotax;
	}

	public void setPriceNotax(String priceNotax) {
		this.priceNotax = priceNotax;
	}

	public String getAmoutNoTax() {
		return amoutNoTax;
	}

	public void setAmoutNoTax(String amoutNoTax) {
		this.amoutNoTax = amoutNoTax;
	}

	public String getTax() {
		return tax;
	}

	public void setTax(String tax) {
		this.tax = tax;
	}

	public String getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(String taxRate) {
		this.taxRate = taxRate;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getFactory() {
		return factory;
	}

	public void setFactory(String factory) {
		this.factory = factory;
	}

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}

	@Override
	public String toString() {
		return "ERPData [id=" + id + ", date=" + date + ", mId=" + mId + ", mCategory=" + mCategory + ", mName=" + mName
				+ ", size=" + size + ", param=" + param + ", buyNum=" + buyNum + ", sentNum=" + sentNum + ", orderId="
				+ orderId + ", nId=" + nId + ", priceNotax=" + priceNotax + ", amoutNoTax=" + amoutNoTax + ", tax="
				+ tax + ", taxRate=" + taxRate + ", total=" + total + ", factory=" + factory + ", requestDate="
				+ requestDate + "]";
	}

}
