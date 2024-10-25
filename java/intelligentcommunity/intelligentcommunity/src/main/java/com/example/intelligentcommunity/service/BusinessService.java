package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Business;
import com.example.intelligentcommunity.dao.BusinessCategory;
import com.example.intelligentcommunity.dao.Product;
import com.example.intelligentcommunity.dao.RepairRequest;
import com.example.intelligentcommunity.dto.BusinessDTO;
import com.example.intelligentcommunity.dto.ProductDTO;

import java.util.List;

public interface BusinessService {

    List<BusinessDTO> findBusinessDTO();

    List<BusinessCategory> findBusinessCategory();

    List<BusinessDTO> findBusinessByCategoryId(int categoryId);
//简易搜索功能
    List<BusinessDTO>  findProductbyname(String Name);
//根据id搜索产品
    ProductDTO findProductById(Integer Id);
//根据id搜索店铺
    BusinessDTO findBusinessById(Integer Id);


}
