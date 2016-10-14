package com.xuwuji.backend.model;

import java.sql.Timestamp;

public class PostBuilder implements Builder<Post> {

	public int postId;
	public String title;
	public String content;
	public String author;
	public String category;
	public int commentNum = 0;
	public Timestamp time;

	public PostBuilder postId(int val) {
		this.postId = val;
		return this;
	}

	public PostBuilder title(String val) {
		this.title = val;
		return this;
	}

	public PostBuilder content(String val) {
		this.content = val;
		return this;
	}

	public PostBuilder author(String val) {
		this.author = val;
		return this;
	}

	public PostBuilder category(String val) {
		this.category = val;
		return this;
	}

	public PostBuilder commentNum(int val) {
		this.commentNum = val;
		return this;
	}

	public PostBuilder time(Timestamp val) {
		this.time = val;
		return this;
	}

	public Post build() {
		return new Post(this);
	}

}
