package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Image;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
public class ActivityDTO  {
    // 属性对应数据库表中的字段
    private int id;
    private int offlineActivityId;
    private int imageGroupId;
    private int views;
    private int favorites;
    private String startTime;
    private String endTime;
    private int type;
    private String address;
    private String name;
    private String titleImage;
    private String details;
    private String organizer;
    private String organizerPhone;
    private String subtitle; //活动副标题

//    新加字段
    private int signupCount;
    private int signupCountMax;
    private String signupEndTime;
    private String signupStartTime;
    private Boolean ifsignup;
    private Boolean ifovertime;
    private List<Image> imageList;
    private BigDecimal signupFee;
    private String gatheringPlace;//活动集合地址
    private String gatheringTime;//集合时间
    private List<String> imageurlList;
}
