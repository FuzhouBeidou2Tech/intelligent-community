package com.example.intelligentcommunity.controller;


import com.example.intelligentcommunity.dao.Business;
import com.example.intelligentcommunity.dao.BusinessCategory;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.BusinessDTO;
import com.example.intelligentcommunity.dto.ProductDTO;
import com.example.intelligentcommunity.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Business")
public class BusinessController {
    @Autowired
    private BusinessService businessService;

    @GetMapping("getAllBusiness")
    public Result<List<BusinessDTO>> getAllBusiness() {
        try {
            String key=System.getenv("ACCESS_KEY_ID");
            System.out.println("111111111111111==");
            System.out.println(key);
            return Result.success(businessService.findBusinessDTO());
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("getBusinessCategory")
    public Result<List<BusinessCategory>> getAllBusinessCategory() {
        try {
            return Result.success(businessService.findBusinessCategory());
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    @GetMapping("getBusinessByCategoryId")
    public Result<List<BusinessDTO>> findBusinessByCategoryId(@RequestParam int categoryId) {
        try {
            return Result.success(businessService.findBusinessByCategoryId(categoryId));
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    @GetMapping("getProductbyname")
    public Result<List<BusinessDTO>> findProductbyname(@RequestParam String name) {
        try {
            return Result.success(businessService.findProductbyname(name));
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("findProductById")
    public Result<ProductDTO> findProductById(@RequestParam int productId) {
        try {
            return Result.success(businessService.findProductById(productId));
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
