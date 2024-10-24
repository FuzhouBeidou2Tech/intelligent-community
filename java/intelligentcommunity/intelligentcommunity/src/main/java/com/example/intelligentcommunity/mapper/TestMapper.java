package com.example.intelligentcommunity.mapper;


import com.example.intelligentcommunity.dao.TestPo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestMapper {
    void insertImage(TestPo testPo);

    TestPo selectImageById(Integer id);
}
