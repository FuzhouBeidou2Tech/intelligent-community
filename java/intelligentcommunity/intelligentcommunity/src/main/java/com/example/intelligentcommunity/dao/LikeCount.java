package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class LikeCount {
    private int id;
    private int likeCountGroupId;
    private int userId;
    private String createdAt;
    private String updatedAt;
}
