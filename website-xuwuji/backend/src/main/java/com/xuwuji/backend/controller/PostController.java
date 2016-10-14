package com.xuwuji.backend.controller;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xuwuji.backend.dao.PostDao;
import com.xuwuji.backend.model.Post;
import com.xuwuji.backend.model.PostBuilder;

@Controller
@RequestMapping(value = "/post")
public class PostController {
	@Autowired
	private PostDao dao;

	@RequestMapping(value = "/getAllPost", method = RequestMethod.GET)
	@ResponseBody
	public List<Post> getAllPost() {
		return dao.getAllPost();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Post get(@PathVariable int id) {
		return null;
	}

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	@ResponseBody
	public void insert(@RequestBody Post post) {
		Timestamp time = new Timestamp(System.currentTimeMillis());
		post.setTime(time);
		System.out.println(post);
		dao.insert(post);
	}

}
