package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Message;


import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.service.ImessageService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

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
    public Result readMessage(@RequestParam int receiverId, int senderId){
        imessageService.readMessage(receiverId, senderId);
        return Result.success("操作成功");
    }



}

