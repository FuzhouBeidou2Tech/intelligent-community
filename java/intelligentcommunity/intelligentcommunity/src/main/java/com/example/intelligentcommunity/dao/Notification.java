package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class Notification {
    private int id;
    private String title;
    private String content;
    private String type;
    private String department;
    private String publisher;
    private String publishTime;
    private String urgencyStatus;
    private int imageGroupId;
}
