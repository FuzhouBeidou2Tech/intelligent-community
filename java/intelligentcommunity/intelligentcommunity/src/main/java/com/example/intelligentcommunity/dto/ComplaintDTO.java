package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Complaint;
import com.example.intelligentcommunity.dao.Image;
import lombok.Data;

import java.util.List;
@Data
public class ComplaintDTO {
    private Complaint complaint;

    private List<Image> images;


}
