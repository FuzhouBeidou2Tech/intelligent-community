package com.example.intelligentcommunity.dto;

import lombok.Data;

@Data
public class MessageDTO {
    private String message;
    private Integer senderId;
    private Boolean isImages;
}
