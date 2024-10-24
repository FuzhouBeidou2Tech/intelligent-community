package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.RepairRequest;
import lombok.Data;

import java.util.List;

@Data
public class RepairRequestDTO {
    RepairRequest repairRequest;
    List<Image> images;

}
