package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Message;


import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.service.ImessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/IMessage")
@Validated
public class ImessageController {
    @Autowired
    ImessageService imessageService;
    @GetMapping("/getImessage")
    public List<Message> getMessages(@RequestParam int senderId, int receiverId) {
        return imessageService.getAllMessage(senderId, receiverId);
    }

    @GetMapping("/readMessage")
    public Result readMessage(@RequestParam int userId, int senderId){
        imessageService.readMessage(userId, senderId);
        return Result.success("操作成功");
    }


}
