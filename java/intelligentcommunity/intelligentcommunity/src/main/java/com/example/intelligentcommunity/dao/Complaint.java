package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Complaint {
    private int complaintId;            // 主键id，自增
    private int userId;                 // 用户id，不能为空
    private String complaintReason;     // 投诉原因，不能为空
    private String complaintDescription;// 投诉描述，不能为空
    private Integer imageGroupId;       // 图片组id，默认值为NULL
    private String complaintAddress;    // 投诉地址，默认值为NULL
    private String complaintStatus;     // 投诉状态，默认为'PENDING'
    private Timestamp createdAt;        // 创建时间，默认为当前时间
    private Timestamp updatedAt;        // 更新时间，默认为当前时间，在更新时自动修改
}
