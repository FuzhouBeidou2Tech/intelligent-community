package com.example.intelligentcommunity.mapper;


import com.example.intelligentcommunity.dao.Building;
import com.example.intelligentcommunity.dao.Community;
import com.example.intelligentcommunity.dao.Room;
import com.example.intelligentcommunity.dao.UserHousing;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
public interface CommunitiesMapper {
    @Select("SELECT id, name, address FROM communities;")
    List<Community> getAllCommunities();

    @Select("SELECT id,community_id,name FROM buildings where community_id=#{communityid}")
    List<Building> getAllBuildings(int communityid);

    @Select("SELECT id,building_id,room_number FROM rooms where building_id=#{buildingId}")
    List<Room> getALLRooms(int buildingId);

    @Insert("insert into user_housing(user_id, community_id, building_id, room_id) values(#{userId}, #{communityId}, #{buildingId}, #{roomId})")
    void addUserHousing(UserHousing userhousing);

    @Select("select * from user_housing where user_id=#{userId}")
    UserHousing selectUserHousing(int userId);

    @Update("UPDATE user_housing SET community_id = #{communityId}, building_id = #{buildingId}, room_id = #{roomId} WHERE user_id = #{userId}")
    void updateUserHousing(UserHousing userhousing);
    //根据userhousing的id查找community的id
    @Select("select * from user_housing where id=#{Id}")
    UserHousing findcommunityid(int Id);
    //根据community的id查找community详细信息
    @Select("select * from communities where id=#{Id}")
    Community findcommunityinfo(int Id);

    @Select("select * from buildings where id=#{buildingId}")
    Building findbuildinfo(int buildingId);

    @Select("select * from rooms where id=#{roomId}")
    Room findroominfo(int roomId);
}
