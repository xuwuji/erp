package com.xuwuji.backend.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import com.xuwuji.backend.mapper.PostMapper;
import com.xuwuji.backend.model.Post;
import com.xuwuji.backend.util.SessionFactory;

@Service
public class PostDao {

	// insert a new post into db
	public void insert(Post post) {
		SqlSession session = SessionFactory.openDEVSession();
		try {

			PostMapper mapper = session.getMapper(PostMapper.class);
			// Map<String, Object> map = new HashMap<String, Object>();
			// map.put(Post.TITLE, post.getTitle());
			// map.put(Post.AUTHOR, post.getAuthor());
			// map.put(Post.CATEGORY, post.getCategory());
			// map.put(Post.CONTENT, post.getContent());
			mapper.insert(post);
			System.out.println(post);
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

	// return all posts from db
	public List<Post> getAllPost() {
		SqlSession session = SessionFactory.openDEVSession();
		try {
			PostMapper mapper = session.getMapper(PostMapper.class);
			return mapper.getAllPost();
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

}
