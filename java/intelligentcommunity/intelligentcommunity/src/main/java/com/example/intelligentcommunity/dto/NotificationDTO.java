package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Notification;
import lombok.Data;

import java.util.List;

@Data
public class NotificationDTO {
    private Notification notification;
    private List<Image> imageList;
}
