package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Image {

    private int id;

    private String imageUrl;

    private String description;

    private Timestamp createdAt;

    private int imageGroupId;
}
