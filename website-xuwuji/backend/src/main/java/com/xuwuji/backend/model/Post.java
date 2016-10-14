package com.xuwuji.backend.model;

import java.sql.Timestamp;

public class Post {
	public static final String POSTID = "postId";
	public static final String TITLE = "title";
	public static final String CONTENT = "content";
	public static final String AUTHOR = "author";
	public static final String CATEGORY = "category";
	public static final String COMMENTNUM = "commentNum";
	public static final String TIME = "time";

	private int postId;
	private String title;
	private String content;
	private String author;
	private String category;
	private int commentNum = 0;
	private Timestamp time;

	public Post() {

	}

	public Post(PostBuilder builder) {
		this.postId = builder.postId;
		this.title = builder.title;
		this.content = builder.content;
		this.author = builder.author;
		this.category = builder.category;
		this.commentNum = builder.commentNum;
		this.time = builder.time;
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getCommentNum() {
		return commentNum;
	}

	public void setCommentNum(int commentNum) {
		this.commentNum = commentNum;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Post [postId=" + postId + ", title=" + title + ", content=" + content + ", author=" + author
				+ ", category=" + category + ", commentNum=" + commentNum + ", time=" + time + "]";
	}

}
