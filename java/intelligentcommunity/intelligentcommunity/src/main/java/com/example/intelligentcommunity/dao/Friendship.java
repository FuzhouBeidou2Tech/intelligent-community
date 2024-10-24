package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;
@Data
public class Friendship {
    private int friendshipId;
    private int user1Id;
    private int user2Id;
    private String status;
    private Timestamp createdTime;

}
