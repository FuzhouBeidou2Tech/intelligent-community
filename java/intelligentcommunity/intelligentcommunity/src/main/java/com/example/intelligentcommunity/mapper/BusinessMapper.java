package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Business;
import com.example.intelligentcommunity.dao.BusinessCategory;
import com.example.intelligentcommunity.dao.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Set;

@Mapper
public interface BusinessMapper {
    //查找店铺
    @Select("select * from business")
    List<Business> findBusiness();
    //根据店铺id查找店铺商品
    @Select("select * from product where business_id=#{businessId}")
    List<Product> findProduct(int businessId);
    //查找商店分类表
    @Select("select * from business_category")
    List<BusinessCategory> findBusinessCategory();
    @Select("select * from business where  business_category_id=#{categoryId}")
    List<Business> findBusinessByCategoryId(int categoryId);

    @Select("select business_id from product where name=#{Name}")
    Set<Integer> findProductbyname(String Name);
//根据id查找商铺
    @Select("select * from business where id=#{Id}")
    Business findBusinessById(Integer Id);

    @Select("select * from product where id=#{Id}")
    Product findProductById(Integer Id);


}
