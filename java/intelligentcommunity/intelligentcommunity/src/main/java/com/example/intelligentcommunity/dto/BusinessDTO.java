package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Business;
import com.example.intelligentcommunity.dao.BusinessCategory;
import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Product;
import lombok.Data;

import java.util.List;

@Data
public class BusinessDTO {
    private Business business;
    private List<ProductDTO> productdto;
}
