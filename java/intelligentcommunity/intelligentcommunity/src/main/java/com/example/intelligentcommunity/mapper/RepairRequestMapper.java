package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.RepairRequest;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RepairRequestMapper {

    @Select("select * from repairrequests where user_id=#{userId} order by created_at DESC")
    List<RepairRequest> getRepairRequests(int userId);

    @Insert("insert into repairrequests(repair_type,repair_address,description,image_group_id,user_id,created_at,updated_at)" +
            "values (#{repairType},#{repairAddress},#{description},#{imageGroupId},#{userId},now(),now())")
    void addRepairRequest(RepairRequest repairRequest);

    @Delete("delete from repairrequests where id=#{Id}")
    void deleterepairRequest(int Id);


}
