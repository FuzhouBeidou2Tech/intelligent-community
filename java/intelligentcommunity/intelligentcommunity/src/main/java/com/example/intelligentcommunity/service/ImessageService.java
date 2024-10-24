package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Message;

import java.util.List;

public interface ImessageService {
    List<Message> getAllMessage(int senderId, int receiverId);

    public void readMessage(int senderId, int receiverId);


}
