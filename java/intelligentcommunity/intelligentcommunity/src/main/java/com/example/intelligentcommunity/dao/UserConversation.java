package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class UserConversation {
    private int conversationID;
    private int user1ID;
    private int user2ID;
    private int lastMessageID;
}
