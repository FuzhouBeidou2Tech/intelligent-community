package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Notification;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.NotificationDTO;
import com.example.intelligentcommunity.dto.NotificationRequest;
import com.example.intelligentcommunity.service.ImageService;
import com.example.intelligentcommunity.service.NotificationService;
import com.example.intelligentcommunity.utils.AliOssUtil;

import org.springframework.aot.hint.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONException;
@RestController
@RequestMapping("/Notification")
@Validated
public class NotificationController {

    @Autowired
    NotificationService notificationService;
    @Autowired
    ImageService imageService;

    @GetMapping("/Title")
    List<Notification> notificationTitle(){
        return notificationService.notificationTitle();
    };
    //查找通知的详细信息
    @GetMapping("/findinfo")
    NotificationDTO findNotificationinfo(@RequestParam int Id){
        NotificationDTO notificationDTO=new NotificationDTO();
        notificationDTO.setNotification(notificationService.findNotificationinfo(Id));
        notificationDTO.setImageList(imageService.findImageByGroupId(notificationService.findNotificationByGroupId(Id)));
        return notificationDTO;
    };

    @GetMapping("/findlist")
    List<Notification> findNotificationList(){
        return notificationService.findNotificationList();
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

    @PostMapping("/insertnotification")
    public Result<String> createNotification(@RequestBody NotificationRequest request) throws Exception {


        Notification notification = new Notification();
        notification.setTitle(request.getTitle());
        notification.setContent(request.getContent());
        notification.setDepartment(request.getDepartment());
        notification.setPublisher(request.getPublisher());

        if (request.getUrgency_status().equals("1")) {
            notification.setUrgencyStatus("urgent");
        } else {
            notification.setUrgencyStatus("non-urgent");
        }

        notification.setType(request.getNoticeType());

        // 假设直接保存图片 URL，不保存文件信息
        int imageId = imageService.createImageGroupAndGetId();
        notification.setImageGroupId(imageId);
        notificationService.insertNotification(notification);

        for (String url : request.getImagePaths()) {
            Image image = new Image();
            image.setImageUrl(url);
            image.setImageGroupId(imageId);
            image.setDescription("通知图片");
            imageService.insertImage(image);
        }

        return Result.success("通知创建成功");
    }
}
