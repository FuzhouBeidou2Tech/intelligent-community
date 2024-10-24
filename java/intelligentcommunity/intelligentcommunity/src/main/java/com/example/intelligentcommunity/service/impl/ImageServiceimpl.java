package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.ImageGroup;
import com.example.intelligentcommunity.mapper.ImageMapper;
import com.example.intelligentcommunity.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceimpl implements ImageService {

    @Autowired
    ImageMapper imageMapper;
    @Override
    public Integer createImageGroupAndGetId() {

        ImageGroup imageGroup = new ImageGroup();
        imageMapper.insertImageGroup(imageGroup);
        return imageGroup.getId();  // 获取插入后生成的主键 ID
    }


    @Override
    public void insertImage(Image image) {
        imageMapper.insertImage(image);
    }

    @Override
    public List<Image> findImageByGroupId(int groupId) {
        return imageMapper.findImageByGroupId(groupId);
    }
}
