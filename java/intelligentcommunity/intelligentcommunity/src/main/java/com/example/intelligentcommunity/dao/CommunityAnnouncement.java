package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.util.Date;

@Data
public class CommunityAnnouncement {
    private Integer id;             // 自增ID，主键
    private Integer authorId;       // 发布人
    private Date publishTime;       // 发布时间
    private String content;         // 发布内容
    private String title;           // 发布标题
    private String imageUrl;        // 发布图片
    private String announcementType; // 发布类型
}
