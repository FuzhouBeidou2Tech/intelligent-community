package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Complaint;
import com.example.intelligentcommunity.dto.ComplaintRequest;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ComplaintMapper {

//查找用户的投诉建议
    @Select("select * from complaints where user_id=#{userId} order by created_at DESC")
    List<Complaint> findComplaintByuserId(Integer userId);
//添加投诉建议
    @Insert("insert into complaints(user_id,complaint_reason,complaint_description,image_group_id,complaint_address)" +
            " values (#{userId},#{complaintReason},#{complaintDescription},#{imageGroupId},#{complaintAddress})")
    void insertComplaint(ComplaintRequest complaintrequest);

    @Delete("delete from complaints where complaint_id=#{Id}")
    void deleteComplaint(int Id);


}
