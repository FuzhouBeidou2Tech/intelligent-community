package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostDTO {
    private String title;
    private String content;
    private String author;
    private int userId;
    private int communityId;
    private List<String> imagePaths;
}
