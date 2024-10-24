package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class OfflineActivity {
    // 属性对应数据库表中的字段
    private int id;
    private Integer activityId;
    private String gatheringPlace;
    private Timestamp gatheringTime;
    private Timestamp signupStartTime;
    private Timestamp signupEndTime;
    private int signupCount;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private BigDecimal signupFee;
    private int signupCountMax;
}
