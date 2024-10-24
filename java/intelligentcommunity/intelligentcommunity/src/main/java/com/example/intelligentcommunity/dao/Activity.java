package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Activity {
    // 属性对应数据库表中的字段
    private int id;
    private Integer offlineActivityId;
    private int imageGroupId;
    private int views;
    private int favorites;
    private Timestamp startTime;
    private Timestamp endTime;
    private int type;
    private String address;
    private String name;
    private String titleImage;
    private String details;
    private String organizer;
    private String organizerPhone;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String subtitle;
}
