package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Friendship;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface FriendMapper {

    @Select("select * from friendships where user1_id=#{user1Id} or user2_id=#{user1Id}  ")
    List<Friendship> getFriendsList(int user1Id);
    //添加好友操作
    @Insert("INSERT INTO friendships(user1_id,user2_id,status,created_time )" +
            " VALUES (#{user1Id},#{user2Id},'Pending',now())")
    void addFriendship(int user1Id,int user2Id);

    @Select("SELECT * FROM friendships WHERE (user1_id=#{user1Id} AND user2_id=#{user2Id}) " +
            "OR (user1_id=#{user2Id} AND user2_id=#{user1Id})")
    Friendship findFriendship(int user1Id, int user2Id);
    //同意好友申请
    @Update("update friendships SET status = 'Accepted' where user1_id = #{user1Id} and user2_id = #{user2Id}")
    void agreeFriendship(int user1Id, int user2Id);
    //拒绝好友申请
    @Update("update friendships SET status = 'Rejected' where user1_id = #{user1Id} and user2_id = #{user2Id}")
    void refuseFriendship(int user1Id, int user2Id);

    //重新发送好友申请
    @Update("update friendships SET status = 'Pending' where user1_id = #{user1Id} and user2_id = #{user2Id}")
    void reloadFriendship(int user1Id, int user2Id);
}

