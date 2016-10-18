package com.xuwuji.backend.dao;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.joda.time.DateTime;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.xuwuji.backend.mapper.ERPDataMapper;
import com.xuwuji.backend.mapper.PostMapper;
import com.xuwuji.backend.model.ERPData;
import com.xuwuji.backend.util.SessionFactory;
import com.xuwuji.backend.util.TimeUtil;

@Service
public class ERPDataDao {

	public List<ERPData> getAll() {
		SqlSession session = SessionFactory.openDEVSession();
		try {
			ERPDataMapper mapper = session.getMapper(ERPDataMapper.class);
			// System.out.println(mapper.getAll());
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

	public HashMap<String, List<String>> getInfo() {
		HashMap<String, List<String>> map = new HashMap<String, List<String>>();
		SqlSession session = SessionFactory.openDEVSession();
		try {
			ERPDataMapper mapper = session.getMapper(ERPDataMapper.class);
			map.put("mCategory", mapper.getMCategory());
			map.put("mName", mapper.getMName());
			map.put("size", mapper.getSize());
			map.put("param", mapper.getParam());
			map.put("factory", mapper.getFactory());
			map.put("mId", mapper.getMId());
			map.put("nId", mapper.getNId());
			return map;
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

	public List<ERPData> get(String json) throws JSONException, UnsupportedEncodingException {
		JSONObject object = new JSONObject(json);
		String from = object.getString("from");
		String end = object.getString("end");
		String[] mCategory = object.getString("mCategory").split(",");
		String[] mName = object.getString("mName").split(",");
		String[] mId = object.getString("mId").split(",");
		String[] nId = object.getString("nId").split(",");
		// String[] size =
		// URLDecoder.decode(object.getString("size")).split("&");
		// // String[] sizes = sizeO.split(",");
		// String sizeString = "";
		// for (String s : size) {
		// // s = URLDecoder.decode(s).replace("&", ",");
		// //System.out.println(s);
		// s = s.replace("^", " ").replace("\"", "\\\"");
		// sizeString += "'" + s + "',";
		// //System.out.println(sizeString);
		//
		// if (s.indexOf(" ") != -1||s.indexOf("\"") != -1) {
		// System.out.println(s + "!!!!!!!");
		// try {
		// Thread.sleep(1000);
		// } catch (InterruptedException e1) {
		// // TODO Auto-generated catch block
		// e1.printStackTrace();
		// }
		// }
		// }
		// System.out.println(size.length);
		// try {
		// Thread.sleep(1000);
		// } catch (InterruptedException e1) {
		// // TODO Auto-generated catch block
		// e1.printStackTrace();
		// }
		// sizeString = sizeString.substring(0, sizeString.length() - 1);
		String[] param = object.getString("param").split(",");
		String[] factory = object.getString("factory").split(",");
		// System.out.println(sizeString);
		try {
			Thread.sleep(100);
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		HashMap<String, Object> map = new HashMap();
		map.put("from", from);
		map.put("end", end);
		map.put(ERPData.MCATEGORY, mCategory);
		map.put(ERPData.MNAME, mName);
		// map.put(ERPData.SIZE, sizeString);
		map.put(ERPData.PARAM, param);
		map.put(ERPData.FACTORY, factory);
		map.put(ERPData.MID, mId);
		map.put(ERPData.NID, nId);

		SqlSession session = SessionFactory.openDEVSession();
		try {
			ERPDataMapper mapper = session.getMapper(ERPDataMapper.class);
			System.out.println(mapper.get(map));
			return mapper.get(map);
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

	public void insert(String json) throws JSONException {
		JSONObject object = new JSONObject(json);
		ERPData data = new ERPData();
		data.setDate(TimeUtil.getSimpleDateTime(new DateTime(object.getString(ERPData.DATE))));
		data.setmId(object.getString(ERPData.MID));
		data.setnId(object.getString(ERPData.NID));
		data.setmName(object.getString(ERPData.MNAME));
		data.setmCategory(object.getString(ERPData.MCATEGORY));
		data.setSize(object.getString(ERPData.SIZE));
		data.setParam(object.getString(ERPData.PARAM));
		data.setBuyNum(Integer.valueOf(object.getString(ERPData.BUYNUM)));
		data.setSentNum(object.getString(ERPData.SENTNUM));
		data.setFactory(object.getString(ERPData.FACTORY));
		data.setTax(String.valueOf(object.getDouble(ERPData.TAX)));
		data.setTaxRate(object.getString(ERPData.TAXRATE));
		data.setTotal(String.valueOf(object.getDouble(ERPData.TOTAL)));
		data.setPriceNoTax(object.getString(ERPData.PRICENOTAX));
		data.setAmoutNoTax(object.getString(ERPData.AMOUNTNOTAX));
		data.setOrderId(object.getString(ERPData.ORDERID));
		data.setRequestDate(TimeUtil.getSimpleDateTime(new DateTime(object.getString(ERPData.REQUESTDATE))));
		SqlSession session = SessionFactory.openDEVSession();
		try {
			ERPDataMapper mapper = session.getMapper(ERPDataMapper.class);
			mapper.insert(data);
			session.commit();
		} catch (Exception e) {
			System.out.println("exce");
			e.printStackTrace();
			session.rollback();
		} finally {
			System.out.println("close");
			session.close();
		}
	}

	public static void main(String[] args) {
		// ERPDataDao dao = new ERPDataDao();
		// dao.getAll();
	}
}
