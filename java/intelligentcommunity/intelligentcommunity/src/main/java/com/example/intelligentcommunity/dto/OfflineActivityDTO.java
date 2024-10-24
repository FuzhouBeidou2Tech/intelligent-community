package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
@Data
public class OfflineActivityDTO {

    private String name;
    private String gatheringTime;
    private String gatheringPlace;
    private String startTime;
    private String endTime;
    private String signupEndTime;
    private BigDecimal signupFee;


}
