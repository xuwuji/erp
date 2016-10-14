package com.xuwuji.backend.mapper;

import java.util.List;
import java.util.Map;

import com.xuwuji.backend.model.Post;

/**
 * 
 * @author craigxu
 *
 */
public interface PostMapper {

	// insert a new post
	public void insert(Post post);

	// get all posts from db
	public List<Post> getAllPost();

}
