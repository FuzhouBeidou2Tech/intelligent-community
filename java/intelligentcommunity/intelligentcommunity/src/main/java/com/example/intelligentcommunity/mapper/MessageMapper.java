package com.example.intelligentcommunity.mapper;



import com.example.intelligentcommunity.dao.Message;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MessageMapper {
//获取聊天框的聊天信息
    @Select("select * from messages where (sender_id=#{senderId} and receiver_id=#{receiverId}) or (sender_id=#{receiverId} and receiver_id=#{senderId})" +
            " ORDER BY created_time ASC")
    List<Message> getAllMessage(int senderId, int receiverId);
//获取最后一条信息
    @Select("select * from messages where " +
            "(sender_id=#{senderId} and receiver_id=#{receiverId}) or(sender_id=#{receiverId} and receiver_id=#{senderId})" +
            "ORDER BY created_time DESC" +
            " LIMIT 1")
    Message getlastMessage(int senderId,int receiverId);
//获取未读信息
    @Select("select * from messages" +
            " where sender_id=#{senderId}" +
            " and receiver_id=#{receiverId}" +
            " and receive_status='Unread' ")
    List<Message>getunreadMessage(int receiverId,int senderId);
//添加信息到数据库
    @Insert("insert into messages(sender_id,receiver_id,content,created_time) " +
            "values (#{senderId},#{receiverId},#{content},now() )")
    void insertMessage(int senderId,int receiverId,String content);
//添加图片
    @Insert("insert into messages(sender_id,receiver_id,content,created_time,ifimage)" +
            "values (#{senderId},#{receiverId},#{Imageurl},now(),'1')")
    void insertMessageImage(int senderId,int receiverId,String Imageurl);

    @Update("UPDATE messages " +
            "SET receive_status = 'Read'" +
            "WHERE sender_id =#{senderId}  " +
            "  AND receiver_id =#{receiverId} " +
            "  AND receive_status = 'Unread' ")
    void readMessage(int receiverId,int senderId);


}
