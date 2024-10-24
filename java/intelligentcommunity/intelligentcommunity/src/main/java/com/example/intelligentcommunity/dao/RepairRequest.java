package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RepairRequest {
    private int id;
    private String repairType;
    private String repairAddress;
    private String description;
    private int imageGroupId;
    private String status;
    private int userId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
