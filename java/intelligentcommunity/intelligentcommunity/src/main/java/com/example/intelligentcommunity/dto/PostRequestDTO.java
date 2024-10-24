package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Image;
import lombok.Data;

import java.util.List;

@Data
public class PostRequestDTO {
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

    private int iflike;

    private int iffavorite;

    private int iffollow;
    private List<Image> imageList;
}
