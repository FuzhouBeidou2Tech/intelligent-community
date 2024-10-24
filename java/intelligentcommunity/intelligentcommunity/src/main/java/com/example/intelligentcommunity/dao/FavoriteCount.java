package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class FavoriteCount {
    private int id;
    private int favoritecountGroupId;
    private int userId;
    private String createdAt;
    private String updatedAt;
}
