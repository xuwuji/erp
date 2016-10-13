package com.xuwuji.erp.backend.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * 
 * factory to get mybatis sql session
 * 
 * @author craigxu
 *
 */
public class SessionFactory {

	/**
	 * connect to different datasources
	 */
	// production factory
	private static SqlSessionFactory PRO_INSTANCE;

	// development factory
	private static SqlSessionFactory DEV_INSTANCE;

	private static final Properties PROPERTIES = new Properties();

	static {
		try {
			InputStream is = SessionFactory.class.getClassLoader().getResourceAsStream("application.properties");
			PROPERTIES.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static SqlSessionFactory getPROInstance() {
		if (PRO_INSTANCE == null) {
			InputStream inputStream = null;
			try {
				inputStream = Resources.getResourceAsStream("mybatis-config.xml");
				PRO_INSTANCE = new SqlSessionFactoryBuilder().build(inputStream, "production");
			} catch (IOException e) {
				throw new RuntimeException(e.getCause());
			} finally {
				if (inputStream != null) {
					try {
						inputStream.close();
					} catch (IOException e) {
					}
				}
			}
		}
		return PRO_INSTANCE;
	}

	public static SqlSessionFactory getDEVInstance() {
		if (DEV_INSTANCE == null) {
			InputStream inputStream = null;
			try {
				inputStream = Resources.getResourceAsStream("mybatis-config.xml");
				DEV_INSTANCE = new SqlSessionFactoryBuilder().build(inputStream, "development");
			} catch (IOException e) {
				throw new RuntimeException(e.getCause());
			} finally {
				if (inputStream != null) {
					try {
						inputStream.close();
					} catch (IOException e) {
					}
				}
			}
		}
		return DEV_INSTANCE;
	}

	public static SqlSession openPROSession() {
		return getPROInstance().openSession();
	}

	public static SqlSession openDEVSession() {
		return getDEVInstance().openSession();
	}

}
