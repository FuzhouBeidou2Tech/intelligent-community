package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class UserFollow {
    private int id;
    private int userId;
    private int followUserId;
}
