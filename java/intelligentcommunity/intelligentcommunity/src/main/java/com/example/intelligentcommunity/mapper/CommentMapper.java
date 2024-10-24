package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Comment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommentMapper {
    @Select("select * from comment where post_id=#{Id} order by updated_at DESC")
    List<Comment> getCommentById(int Id);

    @Insert("insert into comment(post_id,user_id,content,created_at,updated_at) value(#{postId},#{userId},#{content},now(),now())")
    void insertComment(int postId,int userId,String content);
}

    