package com.example.intelligentcommunity.mapper;



import com.example.intelligentcommunity.dao.Message;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MessageMapper {

    @Select("select * from messages where (sender_id=#{senderId} and receiver_id=#{receiverId}) or (sender_id=#{receiverId} and receiver_id=#{senderId})" +
            " ORDER BY created_time ASC")
    List<Message> getAllMessage(int senderId, int receiverId);

    @Select("select content from messages where " +
            "(sender_id=#{senderId} and receiver_id=#{receiverId}) or(sender_id=#{receiverId} and receiver_id=#{senderId})" +
            "ORDER BY created_time DESC" +
            " LIMIT 1")
    String getlastMessage(int senderId,int receiverId);

    @Select("select * from messages" +
            " where sender_id=#{senderId}" +
            " and receiver_id=#{receiverId}" +
            " and receive_status='Unread' ")
    List<Message>getunreadMessage(int senderId,int receiverId);

    @Insert("insert into messages(sender_id,receiver_id,content,created_time) " +
            "values (#{senderId},#{receiverId},#{content},now() )")
    void insertMessage(int senderId,int receiverId,String content);

    @Update("UPDATE messages " +
            "SET receive_status = 'Read'" +
            "WHERE sender_id =#{senderId}  " +
            "  AND receiver_id =#{receiverId} " +
            "  AND receive_status = 'Unread' ")
    void readMessage(int senderId,int receiverId);


    void addMessage(int senderId,int receiverId,String content);
}
