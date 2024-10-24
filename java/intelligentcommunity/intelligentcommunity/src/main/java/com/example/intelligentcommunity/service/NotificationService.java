package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> notificationTitle();

    Notification findNotificationinfo(int Id);

    List<Notification> findNotificationList();

    void insertNotification(Notification notification);

    int findNotificationByGroupId(int Id);
}
