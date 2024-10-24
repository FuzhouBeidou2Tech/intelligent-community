package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Notification;
import com.example.intelligentcommunity.mapper.NotificationMapper;
import com.example.intelligentcommunity.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceimpl implements NotificationService {

    @Autowired
    NotificationMapper notificationMapper;

    @Override
    public List<Notification> notificationTitle() {

        return notificationMapper.notificationTitle();
    }

    @Override
    public Notification findNotificationinfo(int Id) {
        return notificationMapper.findBynotificationinfo(Id);
    }
    @Override
    public List<Notification> findNotificationList() {
        List<Notification> notifications = notificationMapper.findNotificationList();
        // 对通知列表中的每个通知进行处理，将 publishTime 字段格式化
        return notifications.stream().map(notification -> {
            String originalTime = notification.getPublishTime();
            String formattedTime = formatPublishTime(originalTime);// 将原始时间格式化成所需格式
            notification.setPublishTime(formattedTime);
            return notification;// 返回处理后的通知
        }).collect(Collectors.toList());// 收集成列表并返回
    }

    @Override
    public void insertNotification(Notification notification) {
        notificationMapper.insertNotification(notification);
    }

    @Override
    public int findNotificationByGroupId(int Id) {
        return notificationMapper.findNotificationByGroupId(Id);
    }

    private String formatPublishTime(String originalTime) {
        try {
            SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            SimpleDateFormat targetFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = originalFormat.parse(originalTime);
            return targetFormat.format(date);
        } catch (Exception e) {
            e.printStackTrace();
            return originalTime; // 如果解析失败，返回原始时间
        }
    }
}
