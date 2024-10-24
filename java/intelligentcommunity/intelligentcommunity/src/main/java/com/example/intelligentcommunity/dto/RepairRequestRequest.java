package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.util.List;

@Data
public class RepairRequestRequest {
    private String repairType;
    private String repairaddress;
    private String repairdescription;
    private int userid;
    private List<String> imagePaths;
}
