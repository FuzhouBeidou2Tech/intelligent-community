package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Image;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import com.example.intelligentcommunity.dao.ImageGroup;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ImageMapper {
    @Insert("INSERT INTO ImageGroup () VALUES ()")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertImageGroup(ImageGroup imageGroup);

    @Insert("insert into image(image_group_id,image_url,description,created_at)" +
            "values (#{imageGroupId},#{imageUrl},#{description},now())")
    void insertImage(Image image);

    @Select("select * from image where image_group_id=#{groupId}")
    List<Image> findImageByGroupId(int groupId);
}
