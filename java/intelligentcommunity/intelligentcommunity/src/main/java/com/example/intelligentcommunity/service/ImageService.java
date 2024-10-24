package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Image;

import java.util.List;

public interface ImageService {
    public Integer createImageGroupAndGetId();

    void insertImage(Image image);
    List<Image> findImageByGroupId(int groupId);
}
