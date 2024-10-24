package com.example.intelligentcommunity.service.impl;


import com.example.intelligentcommunity.mapper.UserMapper;
import com.example.intelligentcommunity.service.UserService;
import com.example.intelligentcommunity.dao.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

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
    public void register(String username, Long phoneNumber) {
        //加密

        //添加
        userMapper.add(username,phoneNumber);
    }

    @Override
    public void update(String username, byte gender,Long phoneNumber) {
        userMapper.update(username,gender,phoneNumber);
    }

    @Override
    public List<User> searchUser(String value) {
        return userMapper.searchUser(value);
    }


}
