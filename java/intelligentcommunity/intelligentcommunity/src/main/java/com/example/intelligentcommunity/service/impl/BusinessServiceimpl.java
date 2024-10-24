package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Business;
import com.example.intelligentcommunity.dao.BusinessCategory;
import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Product;
import com.example.intelligentcommunity.dto.BusinessDTO;
import com.example.intelligentcommunity.dto.ProductDTO;
import com.example.intelligentcommunity.mapper.BusinessMapper;
import com.example.intelligentcommunity.mapper.ImageMapper;
import com.example.intelligentcommunity.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BusinessServiceimpl implements BusinessService {

    @Autowired
    private BusinessMapper businessMapper;
    @Autowired
    private ImageMapper imageMapper;
//    查找所有商店
    @Override
    public List<BusinessDTO> findBusinessDTO() {
         return businessMapper.findBusiness().stream().map(
                businesslist->{
                    BusinessDTO businessDTO = new BusinessDTO();
                    businessDTO.setBusiness(businesslist);
                    List<ProductDTO>  productDTOList=businessMapper.findProduct(businessDTO.getBusiness().getId()).stream().map(
                            product -> {
                                ProductDTO productDTO = new ProductDTO();
                                productDTO.setId(product.getId());
                                productDTO.setBusinessId(product.getBusinessId());
                                productDTO.setImageGroupId(product.getImageGroupId());
                                productDTO.setDescription(product.getDescription());
                                productDTO.setName(product.getName());
                                productDTO.setPrice(product.getPrice());
                                productDTO.setImageList(imageMapper.findImageByGroupId(product.getImageGroupId()));
                                return productDTO;
                            }
                    ).collect(Collectors.toList());
                    businessDTO.setProductdto(productDTOList);
                    return businessDTO;
                }
        ).collect(Collectors.toList());


    }

    @Override
    public List<BusinessCategory> findBusinessCategory() {
        return businessMapper.findBusinessCategory();
    }

    @Override
    public List<BusinessDTO> findBusinessByCategoryId(int categoryId) {
        return businessMapper.findBusinessByCategoryId(categoryId).stream().map(
                businesslist->{
                    BusinessDTO businessDTO = new BusinessDTO();
                    businessDTO.setBusiness(businesslist);
                    List<ProductDTO>  productDTOList=businessMapper.findProduct(businessDTO.getBusiness().getId()).stream().map(
                            product -> {
                                ProductDTO productDTO = new ProductDTO();
                                productDTO.setId(product.getId());
                                productDTO.setBusinessId(product.getBusinessId());
                                productDTO.setImageGroupId(product.getImageGroupId());
                                productDTO.setDescription(product.getDescription());
                                productDTO.setName(product.getName());
                                productDTO.setPrice(product.getPrice());
                                productDTO.setImageList(imageMapper.findImageByGroupId(product.getImageGroupId()));
                                return productDTO;
                            }
                    ).collect(Collectors.toList());
                    businessDTO.setProductdto(productDTOList);
                    return businessDTO;
                }
        ).collect(Collectors.toList());
    }

    @Override
    public List<BusinessDTO>  findProductbyname(String Name) {

       Set<Integer> businessIdSet= businessMapper.findProductbyname(Name);
       List<BusinessDTO> businessDTOList=new ArrayList<BusinessDTO>();
        for(Integer businessId:businessIdSet){
            BusinessDTO businessDTO = new BusinessDTO();
            Business business= businessMapper.findBusinessById(businessId);
            businessDTO.setBusiness(business);
            List<ProductDTO>  productDTOList=businessMapper.findProduct(businessDTO.getBusiness().getId()).stream().map(
                    product -> {
                        ProductDTO productDTO = new ProductDTO();
                        productDTO.setId(product.getId());
                        productDTO.setBusinessId(product.getBusinessId());
                        productDTO.setImageGroupId(product.getImageGroupId());
                        productDTO.setDescription(product.getDescription());
                        productDTO.setName(product.getName());
                        productDTO.setPrice(product.getPrice());
                        productDTO.setImageList(imageMapper.findImageByGroupId(product.getImageGroupId()));
                        return productDTO;
                    }
            ).collect(Collectors.toList());
            businessDTO.setProductdto(productDTOList);
            businessDTOList.add(businessDTO);
        }
        return businessDTOList;
    }

    @Override
    public ProductDTO findProductById(Integer Id) {
        Product product = businessMapper.findProductById(Id);
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setBusinessId(product.getBusinessId());
        productDTO.setImageGroupId(product.getImageGroupId());
        productDTO.setDescription(product.getDescription());
        productDTO.setName(product.getName());
        productDTO.setPrice(product.getPrice());
        productDTO.setImageList(imageMapper.findImageByGroupId(product.getImageGroupId()));
        productDTO.setCreatedAt(product.getCreatedAt());
        productDTO.setUpdatedAt(product.getUpdatedAt());
        return productDTO ;
    }

    @Override
    public BusinessDTO findBusinessById(Integer Id) {
        return null;
    }
}
