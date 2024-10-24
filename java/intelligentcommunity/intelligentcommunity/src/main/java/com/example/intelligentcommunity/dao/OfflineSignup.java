package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class OfflineSignup {
    // 属性对应数据库表中的字段
    private int id;
    private int offlineActivityId;
    private int userId;
    private String userName;
    private String userPhone;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String feedback;
    private Integer rating; // 因为评分可能为空，所以使用包装类型
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
