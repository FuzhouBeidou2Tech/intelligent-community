package com.example.intelligentcommunity.dao;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class Message {
    private int messageID;
    private int senderID;
    private int receiverID;
    private String content;
    private Timestamp createdTime;
    private String sendStatus;
    private String receiveStatus;
}
