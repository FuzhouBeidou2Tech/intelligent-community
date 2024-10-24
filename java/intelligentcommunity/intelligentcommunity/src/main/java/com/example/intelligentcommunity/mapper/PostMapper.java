package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PostMapper
{
    //按照时间靠前和community_id=#{communityId}优先级排序，如果没有community_id=#{communityId}，则按照时间排序。一共查找三条数据
//    @Select("SELECT * FROM (" +
//            "(SELECT * " +
//            "FROM post " +
//            "WHERE community_id = #{communityId} " +
//            "ORDER BY created_at ASC " +
//            "LIMIT 3) " +
//            "UNION ALL " +
//            "(SELECT * " +
//            "FROM post " +
//            "WHERE community_id != #{communityId} OR community_id IS NULL " +
//            "ORDER BY created_at ASC " +
//            "LIMIT 3)" +
//            ") subquery " +
//            "ORDER BY created_at ASC " +
//            "LIMIT 3")
//    List<Post> findPosts(int communityId);
    @Select("SELECT * FROM (" +
            "SELECT * FROM (" +
            "SELECT *, 1 AS priority " +
            "FROM post " +
            "WHERE community_id = #{communityId} " +
            "ORDER BY created_at DESC " +
            "LIMIT 3" +
            ") AS primary_posts " +
            "UNION ALL " +
            "SELECT * FROM (" +
            "SELECT *, 2 AS priority " +
            "FROM post " +
            "WHERE community_id != #{communityId} OR community_id IS NULL " +
            "ORDER BY created_at DESC " +
            "LIMIT 3" +
            ") AS secondary_posts " +
            ") AS combined " +
            "ORDER BY priority ASC, created_at DESC " +
            "LIMIT 3")
    List<Post> findPosts(int communityId);

    @Select("SELECT * FROM post ORDER BY created_at DESC" )
    List<Post> findPostAll();

    @Select("SELECT * FROM post WHERE id=#{Id}")
    Post finPostByid(int Id);

    @Select("SELECT * FROM post WHERE user_id=#{userId} ORDER BY created_at DESC")
    List<Post> findPostByuserid(int userId);
//    添加点赞数量
    @Update("update post set like_count=like_count+1 where id=#{postId}")
    void addlikepost(int postId);
    //添加点赞信息
    @Insert("insert into likecount(like_count_group_id,user_id,created_at,updated_at)" +
            "values(#{likeCountGroupId},#{userId},now(),now())")
    void addlikecount(int likeCountGroupId,int userId);

    //添加收藏数量
    @Update("update post set favorite_count=favorite_count+1 where id=#{postId}")
    void addfavoritepost(int postId);
    //添加收藏信息
    @Insert("insert into favoritecount(favoritecount_group_id,user_id,created_at,updated_at)" +
            "values (#{favoriteCountGroupId},#{userId},now(),now())")
    void addfavoritecount(int favoriteCountGroupId,int userId);
//添加评论数量
    @Update("update post set comment_count=comment_count+1 where id=#{Id}")
    void addcommentcount(int Id);
    //取消点赞数量
    @Update("update post set like_count=like_count-1 where id=#{postId}")
    void deletelikepost(int postId);
    //删除点赞信息
    @Delete("delete from likecount where like_count_group_id=#{likeCountGroupId} and user_id=#{userId}")
    void deletelikecount(int likeCountGroupId,int userId);

    //取消收藏数量
    @Update("update post set favorite_count=favorite_count-1 where id=#{postId}")
    void deletefavoritepost(int postId);
    //删除收藏信息
    @Delete("delete from favoritecount where favoritecount_group_id=#{favoriteCountGroupId} and user_id=#{userId}")
    void deletefavoritecount(int favoriteCountGroupId,int userId);


//    查找likeCountGroupId
    @Select("select like_count_group_id from post where id=#{Id}")
    int findlikeCountGroupId(int Id);
//    查找findfavoriteCountGroupId
    @Select("select favorite_count_group_id from post where id=#{id}")
    int findfavoriteCountGroupId(int Id);



    @Insert("insert into post(title,author,content,created_at,updated_at,comment_count,favorite_count,view_count," +
            "image_group_id,user_id,community_id,like_count,like_count_group_id,favorite_count_group_id) " +
            "values (#{title},#{author},#{content},now(),now(),#{commentCount},#{favoriteCount},#{viewCount}," +
            "#{imageGroupId},#{userId},#{communityId},#{likeCount},#{likeCountGroupId},#{favoriteCountGroupId})")
    void addpost(Post post);
    //查找用户是否点赞
    @Select("select * from likecount where like_count_group_id=#{groupId} and user_id=#{userId}")
    LikeCount selectLikeCount(int groupId,int userId);

    //查找用户是否收藏
    @Select("select * from favoritecount where favoritecount_group_id=#{groupId} and user_id=#{userId}")
    FavoriteCount selectfavoriteCount(int groupId,int userId);

    @Insert("INSERT INTO likecountgroup () VALUES ()")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertLikeCountGroup(LikeCountGroup likeCountGroup);

    @Insert("INSERT INTO favoritecountgroup () VALUES ()")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertFavoriteCountGroup(FavoriteCountGroup favoriteCountGroup );

    //根据postid操作image_group_id

    @Select("select image_group_id from post where id=#{postId}")
    int  findimageGroupId(int postId);

    @Select("select favoritecount_group_id from favoritecount where user_id=#{userId}")
    List<Integer> findfavoritecountGroupIdByuserid(int userId);

    @Select("select * from post where favorite_count_group_id=#{favoritecountGroupId}")
    Post findPostByfavoritecountGroupId(int favoritecountGroupId);

    @Delete("delete from post where id=#{postId}")
    void deletePost(int postId);
//    查找好友关系表
    @Select("select id from user_follow where user_id=#{userId} and follow_user_id=#{followUserId}")
    Integer findUserFollow(int userId, int followUserId);
//添加关注好友
    @Insert("insert into user_follow(user_id,follow_user_id) values (#{userId},#{followUserId})")
    void insertUserFollow(int userId, int followUserId);
//    取消好友关注
    @Delete("delete from user_follow where user_id=#{userId} and follow_user_id=#{followUserId}")
    void deleteUserFollow(int userId, int followUserId);
}
