package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.util.List;

@Data
public class ComplaintRequest {
    private int userId;
    private String complaintReason;
    private int imageGroupId;
    private String complaintDescription;
    private String complaintAddress;
    private List<String> imagePaths;
}
