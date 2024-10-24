package com.example.intelligentcommunity.dao;

import lombok.Data;
import org.springframework.data.relational.core.sql.In;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class Product {

    private Integer id;  // 产品ID，自增主键

    private Integer businessId;  // 商店，映射到Business实体，级联删除

    private String name;  // 商品名称，非空

    private Integer imageGroupId;  // 图片组ID

    private String description;  // 商品描述

    private BigDecimal price;  // 价格

    private Timestamp createdAt;  // 创建时间

    private Timestamp updatedAt;  // 修改时间
}
