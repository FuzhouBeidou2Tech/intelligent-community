package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Friendship;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.FriendshipDTO;
import com.example.intelligentcommunity.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Friends")
@Validated
public class FriendController {

    @Autowired
    FriendshipService friendshipService;

    @GetMapping("/getfriends")
    public List<FriendshipDTO> getFriendships(@RequestParam int user1Id) {
        System.out.println("用户id");
        System.out.println(user1Id);
        return friendshipService.getFriendships(user1Id);
    }

    @PutMapping("/addfriends")
    public Result addFriendship(@RequestParam int user1Id, int user2Id) {
        Friendship friendship= friendshipService.findFriendship(user1Id,user2Id);
        if(friendship==null){
            friendshipService.addFriendship(user1Id, user2Id);
            return Result.success();
        }else{
            if("Accepted".equals(friendship.getStatus())){
                int code=101;
                return Result.errorcode(code,"当前用户已经是你的好友");
            } else if ("Rejected".equals(friendship.getStatus())) {
                friendshipService.reloadFriendship(user1Id, user2Id);
                int code=102;
                return Result.errorcode(code,"已重新发送好友请求");
            } else {
                int code=103;
                return Result.errorcode(code,"已发送好友请求");
            }
        }
    }


    @PutMapping("/agreefirend")
    public Result agrssFriendship(@RequestParam int user1Id,int user2Id) {
        friendshipService.agreeFriendship(user1Id,user2Id);
        return Result.success();
    }

    @PutMapping("/refusefirend")
    public Result refuseFriendship(@RequestParam int user1Id,int user2Id) {
        friendshipService.refuseFriendship(user1Id,user2Id);
        return Result.success();
    }

    
}


