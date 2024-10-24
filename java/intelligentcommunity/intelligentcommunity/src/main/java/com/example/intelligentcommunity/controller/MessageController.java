package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.common.utils.SocketUtil;
import com.example.intelligentcommunity.dao.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Message")
@Validated
public class MessageController {
    @Autowired
    SocketUtil socketUtil;
    @GetMapping("/sendmessage")
    public Result sendToOne(@RequestParam int userId , String message,int senderId){
        socketUtil.sendToOne(userId,message,senderId);
        return Result.success("单独发送消息成功。");
    }

}
