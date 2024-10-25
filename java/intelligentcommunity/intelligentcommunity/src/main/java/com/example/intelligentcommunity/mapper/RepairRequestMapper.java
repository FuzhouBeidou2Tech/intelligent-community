package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.RepairRequest;
import org.apache.ibatis.annotations.*;

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

    @Select("select * from repairrequests  order by created_at DESC")
    List<RepairRequest> getRepairRequestsall();
//修改维修状态为处理中
    @Update("update repairrequests set status='IN_PROGRESS' where id=#{Id}")
    void updateRepairsINPROGRESS(Integer Id);
//    修改维修状态为处理成功
    @Update("update repairrequests set status='COMPLETED' where id=#{Id}")
    void updateRepairsCOMPLETED(Integer Id);
//修改维修状态为审核失败
    @Update("update repairrequests set status='REJECTED' where id=#{Id}")
    void updateRepairsREJECTED(Integer Id);
}
