package com.example.intelligentcommunity.mapper;


import com.example.intelligentcommunity.dao.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserMapper {
    //根据用户名查询用户
    @Select("select * from user where username=#{username}")
    User findByUserName(String username);

    //根据id查询用户名
    @Select("select username from user where id=#{Id}")
    String findNameByid(int Id);
    //根据手机号码查询用户名
    @Select("SELECT * FROM user WHERE phoneNumber = #{PhoneNumber}")
    User findByUserinfo(long PhoneNumber);
    //根据手机号码查询
    @Select("select * from user where phoneNumber=#{phoneNumber}")
    User findByPhoneNumber(Long phoneNumber);
    //添加
    @Insert("insert into user(username,phoneNumber,create_time,update_time)" +
            " values(#{username},#{phoneNumber},now(),now())")
    void add(String username, Long phoneNumber);

    @Update("update user set username=#{username},gender=#{gender},update_time=now() where phoneNumber=#{phoneNumber}")
    void update(String username, byte gender,Long phoneNumber);

    @Update("update user set user_pic=#{avatarUrl},update_time=now() where id=#{id}")
    void updateAvatar(String avatarUrl,Integer id);

    @Update("update user set password=#{md5String},update_time=now() where id=#{id}")
    void updatePwd(String md5String, Integer id);

    //根据手机号或者用户名操作

    @Select("SELECT * from user where phoneNumber=#{value} or username=#{value}")
    List<User> searchUser(String value);
}
