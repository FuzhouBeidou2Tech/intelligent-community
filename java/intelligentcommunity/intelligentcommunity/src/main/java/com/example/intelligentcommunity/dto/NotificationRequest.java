package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.util.List;

@Data
public class NotificationRequest {
    private String noticeType;
    private String title;
    private String content;
    private String department;
    private String publisher;
    private String urgency_status;
    private List<String> imagePaths;
}
