package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.common.utils.SocketUtil;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/Message")
@Validated
public class MessageController {
    @Autowired
    SocketUtil socketUtil;
    @GetMapping("/sendmessage")
    public Result sendToOne(@RequestParam int userId ,@RequestParam String message,@RequestParam int senderId){
        socketUtil.sendToOne(userId,message,senderId);
        return Result.success("单独发送消息成功。");
    }

    @GetMapping("/sendimages")
    public Result sendToOneImage(@RequestParam int userId ,@RequestParam String message,@RequestParam int senderId){
        socketUtil.sendToOneImage(userId,message,senderId);
        return Result.success("发送图片成功");

    }

    @PostMapping("/inserimage")
    public Result<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("进去");
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String url = AliOssUtil.uploadFile(filename, file.getInputStream());
        // 假设简单返回文件地址
        return Result.success(url);
    }
}
