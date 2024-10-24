package com.example.intelligentcommunity.dao;

import lombok.Data;

@Data
public class UserHousing {
    private int id;
    private int userId;
    private int communityId;
    private int buildingId;
    private int roomId;
}
