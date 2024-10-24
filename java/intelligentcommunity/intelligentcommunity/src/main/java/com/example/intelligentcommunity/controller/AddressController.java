package com.example.intelligentcommunity.controller;


import com.example.intelligentcommunity.dao.Building;
import com.example.intelligentcommunity.dao.Community;
import com.example.intelligentcommunity.dao.Room;
import com.example.intelligentcommunity.dao.UserHousing;
import com.example.intelligentcommunity.service.CommunitiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/Address")
@Validated
public class AddressController {

    @Autowired
    private CommunitiesService communitiesService;

    @GetMapping("/Communities")
    public List<Community> getAllCommunities() {
        return communitiesService.getAllCommunities();
    }

    @GetMapping("/Buildings")
    public List<Building> getAllBuilds(@RequestParam int communityId) {
        return communitiesService.getAllBuildings(communityId);
    }
    @GetMapping("/Rooms")
    public List<Room> getAllRooms(@RequestParam int buildingId) {
        return communitiesService.getRooms(buildingId);
    }
    @PutMapping("/submit")
    public ResponseEntity<String> addUserHousing(@RequestBody UserHousing userHousing){
        try {
            System.out.println("进入成功userHousing"+userHousing);
            if(communitiesService.selectUserHousing(userHousing.getUserId())==null){
                communitiesService.addUserHousing(userHousing);
                System.out.println("用户没有绑定");
                return ResponseEntity.ok("用户信息更新成功");
            }else{
                communitiesService.updateUserHousing(userHousing);
                System.out.println("用户有绑定");
                return ResponseEntity.ok("用户信息更新成功");
            }

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("用户信息更新失败");
        }
    }
}

