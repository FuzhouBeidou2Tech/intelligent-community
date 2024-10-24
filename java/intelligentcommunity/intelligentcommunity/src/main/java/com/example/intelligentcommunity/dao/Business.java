package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Business {

    private Integer id;  // 商店ID，自增主键


    private Integer userId;  // 用户ID


    private Integer businessCategoryId;  // 商店类型ID


    private String titleImage;  // 商店标题图片


    private String name;  // 商店名称，非空


    private String description;  // 描述


    private String address;  // 店铺地址


    private Long contactPhone;  // 联系手机号码


    private Timestamp createdAt;  // 创建时间


    private Timestamp updatedAt;  // 修改时间

}
