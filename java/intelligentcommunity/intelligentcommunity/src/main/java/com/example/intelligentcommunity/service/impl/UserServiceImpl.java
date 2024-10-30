package com.example.intelligentcommunity.service.impl;


import com.example.intelligentcommunity.mapper.UserMapper;
import com.example.intelligentcommunity.service.FriendshipService;
import com.example.intelligentcommunity.service.UserService;
import com.example.intelligentcommunity.dao.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FriendshipService friendshipService;

    @Override
    public User findByUserName(String username) {
        User u = userMapper.findByUserName(username);
        return u;
    }

    public User findByUserinfo(Long phoneNumber){
        User u= userMapper.findByUserinfo(phoneNumber);
        return u;
    }
    @Override
    public User findByPhoneNumber(Long phoneNumber) {
        User u= userMapper.findByPhoneNumber(phoneNumber);
        return u;
    }

    @Override
    @Transactional
    public void register(String username, Long phoneNumber) {
        //加密
        //添加
        String defaultImage="https://intelligent-community627.oss-cn-fuzhou.aliyuncs.com/%E7%94%A8%E6%88%B7%2C%E5%A4%B4%E5%83%8F.png";
        userMapper.add(username,phoneNumber,defaultImage);
        //根据手机号码查找用户id

        //添加物业管理员
        friendshipService.addFriendship(userMapper.findIdByPhoneNumber(phoneNumber), 3);

        friendshipService.agreeFriendship(userMapper.findIdByPhoneNumber(phoneNumber), 3);
    }

    @Override
    public void update(String username, byte gender,Long phoneNumber,String image) {
        userMapper.update(username,gender,phoneNumber,image);
    }

    @Override
    public List<User> searchUser(String value) {
        return userMapper.searchUser(value);
    }

    @Override
    public void updateUserImage(Integer Id, String image) {
        userMapper.updateUserImage(Id,image);
    }


}
