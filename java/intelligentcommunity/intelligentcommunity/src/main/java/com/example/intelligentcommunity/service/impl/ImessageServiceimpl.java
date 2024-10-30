package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.mapper.MessageMapper;
import com.example.intelligentcommunity.dao.Message;
import com.example.intelligentcommunity.service.ImessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImessageServiceimpl implements ImessageService {

    @Autowired
    MessageMapper messageMapper;
    //获取所有信息
    @Override
    public List<Message> getAllMessage(int senderId, int receiverId) {
        return messageMapper.getAllMessage(senderId, receiverId);
    }

    @Override
    public void readMessage(int userId, int senderId) {
        messageMapper.readMessage(senderId,userId);
    }




}
