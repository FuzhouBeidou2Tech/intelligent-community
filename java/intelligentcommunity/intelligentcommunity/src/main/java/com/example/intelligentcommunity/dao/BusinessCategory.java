package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BusinessCategory {
    private int id;
    private String categoryName;
    private Timestamp createdAt;  // 创建时间
    private Timestamp updatedAt;  // 修改时间
}
