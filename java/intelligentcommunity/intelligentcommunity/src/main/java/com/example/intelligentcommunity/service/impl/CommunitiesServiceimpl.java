package com.example.intelligentcommunity.service.impl;


import com.example.intelligentcommunity.mapper.CommunitiesMapper;
import com.example.intelligentcommunity.service.CommunitiesService;
import com.example.intelligentcommunity.dao.Building;
import com.example.intelligentcommunity.dao.Community;
import com.example.intelligentcommunity.dao.Room;
import com.example.intelligentcommunity.dao.UserHousing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommunitiesServiceimpl implements CommunitiesService {
    @Autowired
    private CommunitiesMapper communitiesMapper;

    @Override
    public List<Community> getAllCommunities() {
        return communitiesMapper.getAllCommunities();
    }

    @Override
    public List<Building> getAllBuildings(int communityId) {
        return communitiesMapper.getAllBuildings(communityId);

    }

    @Override
    public List<Room> getRooms(int buildingId) {
        return communitiesMapper.getALLRooms(buildingId);
    }
    @Override
    @Transactional
    public void addUserHousing(UserHousing userhousing){
        communitiesMapper.addUserHousing(userhousing);
    }

    @Override
     public UserHousing selectUserHousing (int userId){
        return communitiesMapper.selectUserHousing(userId);
    }
    @Override
    public void updateUserHousing(UserHousing userhousing){
        communitiesMapper.updateUserHousing(userhousing);
    }

    @Override
    public UserHousing findcommunityid(int Id) {
        return communitiesMapper.findcommunityid(Id);
    }

    @Override
    public Community findcommunityinfo(int Id) {
        return communitiesMapper.findcommunityinfo(Id);
    }

    @Override
    public Building findbuildinfo(int buildingId) {
        return communitiesMapper.findbuildinfo(buildingId);
    }

    @Override
    public Room findroominfo(int roomId) {
        return communitiesMapper.findroominfo(roomId);
    }
}