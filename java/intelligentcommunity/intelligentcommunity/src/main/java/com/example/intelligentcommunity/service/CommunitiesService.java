package com.example.intelligentcommunity.service;



import com.example.intelligentcommunity.dao.Building;
import com.example.intelligentcommunity.dao.Community;
import com.example.intelligentcommunity.dao.Room;
import com.example.intelligentcommunity.dao.UserHousing;

import java.util.List;

public interface CommunitiesService {

     List<Community> getAllCommunities();
     List<Building> getAllBuildings(int communityId);
     List<Room> getRooms(int buildingId);

     void addUserHousing(UserHousing userhousing);

    UserHousing selectUserHousing (int userId);

    void updateUserHousing(UserHousing userhousing);

    UserHousing findcommunityid(int Id);

    Community findcommunityinfo(int Id);

    Building findbuildinfo(int buildingId);

    Room findroominfo(int roomId);
}
