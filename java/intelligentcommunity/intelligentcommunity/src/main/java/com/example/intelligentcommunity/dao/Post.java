package com.example.intelligentcommunity.dao;


import lombok.Data;

import java.sql.Timestamp;


@Data
public class Post {

    private int id;

    private String title;

    private String author;

    private String content;

    private String createdAt;

    private String updatedAt;

    private int commentCount ;

    private int favoriteCount ;

    private int viewCount ;

    private int imageGroupId;

    private int likeCount;

    private int userId;

    private int likeCountGroupId;

    private int favoriteCountGroupId;

    private Integer communityId;


}
