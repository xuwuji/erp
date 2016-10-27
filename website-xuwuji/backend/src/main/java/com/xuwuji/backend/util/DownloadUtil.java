package com.xuwuji.backend.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;

public class DownloadUtil {
	private static final int BUFFER_SIZE = 4096;

	public static void exportText(HttpServletRequest request, HttpServletResponse response, Object data) {
		try {
			InputStream is = new ByteArrayInputStream(data.toString().getBytes(StandardCharsets.UTF_8));
			OutputStream os = response.getOutputStream();
			byte[] buffer = new byte[BUFFER_SIZE];
			while ((is.read(buffer)) != -1) {
				os.write(buffer);
			}
		} catch (Exception e) {

		}
	}

	public static void exportExcel(HttpServletRequest request, HttpServletResponse response, Workbook wb)
			throws IOException {
		ServletOutputStream out = response.getOutputStream();
		wb.write(out);
		out.flush();
		out.close();
	}

}
