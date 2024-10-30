package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Message;
import com.example.intelligentcommunity.dto.FriendshipDTO;
import com.example.intelligentcommunity.mapper.FriendMapper;
import com.example.intelligentcommunity.dao.Friendship;
import com.example.intelligentcommunity.mapper.MessageMapper;
import com.example.intelligentcommunity.mapper.UserMapper;
import com.example.intelligentcommunity.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendshipServiceimpl implements FriendshipService {
    @Autowired
    FriendMapper friendMapper;
    @Autowired
    UserMapper userMapper;

    @Autowired
    MessageMapper messageMapper;
    @Override
    public List<FriendshipDTO> getFriendships(int user1Id) {
        List<FriendshipDTO> friendDTOlist = new ArrayList<>();
        List<Friendship> friendlist=friendMapper.getFriendsList(user1Id);
        System.out.println("friendlist");
        System.out.println(friendlist);
       for(Friendship friendship:friendlist){
           FriendshipDTO friendDTO=new FriendshipDTO();
           System.out.println("循环信息");
           System.out.println(friendship);
           System.out.println(friendship.getUser2Id());
           String username=userMapper.findNameByid(friendship.getUser2Id());
           Message message=messageMapper.getlastMessage(friendship.getUser1Id(),friendship.getUser2Id());
           String lastname="";
           if(message!=null){
               lastname=message.getContent();
           }

           //更新操作

           List<Message> unmessagelist=messageMapper.getunreadMessage(friendship.getUser2Id(),friendship.getUser1Id());
           friendDTO.setUnreadMessageCount(unmessagelist.size());
           friendDTO.setUnreadMessageList(unmessagelist);
           friendDTO.setCreatedTime(friendship.getCreatedTime());
           friendDTO.setFriendshipId(friendship.getFriendshipId());
           friendDTO.setStatus(friendship.getStatus());
           friendDTO.setCreatedTime(friendship.getCreatedTime());
           friendDTO.setUser2Id(friendship.getUser2Id());
           friendDTO.setUser1Id(friendship.getUser1Id());
           friendDTO.setUser1Name(username);
           friendDTO.setLastmessage(lastname);
           if(messageMapper.getlastMessage(friendship.getUser1Id(),friendship.getUser2Id())!=null){
               friendDTO.setIfimage(messageMapper.getlastMessage(friendship.getUser1Id(),friendship.getUser2Id()).getIfimage());
           }
           friendDTOlist.add(friendDTO);
       }
    return friendDTOlist;
    }

    @Override
    public void addFriendship(int user1Id, int user2Id) {
        friendMapper.addFriendship(user1Id,user2Id);
    }

    @Override
    public Friendship findFriendship(int user1Id, int user2Id) {
        return friendMapper.findFriendship(user1Id,user2Id);
    }

    @Override
    public void agreeFriendship(int user1Id, int user2Id) {
        friendMapper.agreeFriendship(user1Id,user2Id);
    }

    @Override
    public void refuseFriendship(int user1Id, int user2Id) {
        friendMapper.refuseFriendship(user1Id,user2Id);
    }

    @Override
    public void reloadFriendship(int user1Id, int user2Id) {
        friendMapper.reloadFriendship(user1Id,user2Id);
    }
}
