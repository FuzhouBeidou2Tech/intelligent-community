package com.example.intelligentcommunity.service;



import com.example.intelligentcommunity.dao.User;

import java.util.List;

public interface UserService {
    //根据用户名查询用户
    User findByUserName(String username);

    //根据手机号码查询用户
    User findByPhoneNumber(Long phoneNumber);

    //根据手机号码查询用户信息
    public User findByUserinfo(Long phoneNumber);
    //注册
    void register(String username, Long phoneNumber);

    //更新
    void update(String username, byte gender,Long phoneNumber,String image);


    //搜索
    List<User> searchUser(String value);
    //修改用户头像
    void updateUserImage(Integer Id, String image);

    }
