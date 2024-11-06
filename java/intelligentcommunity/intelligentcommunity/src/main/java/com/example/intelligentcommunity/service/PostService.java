package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.FavoriteCountGroup;
import com.example.intelligentcommunity.dao.LikeCount;
import com.example.intelligentcommunity.dao.LikeCountGroup;
import com.example.intelligentcommunity.dao.Post;
import com.example.intelligentcommunity.dto.PostCommentDTO;
import com.example.intelligentcommunity.dto.PostRequestDTO;

import java.util.List;

public interface PostService {

    List<Post> findPosts(Integer communityId);

    List<PostRequestDTO> findPostAll(int userId);

    public PostCommentDTO finPostByid(int Id);

    List<Post> findPostByuserid(int userId);

    void addlikecount(int likeCountGroupId,int userId);

    void addlikepost(int postId);

    void addpost(Post post);
    //创建LikeCountGroup组
     Integer insertLikeCountGroup();
    //创建FavoriteCountGroup组
     Integer insertFavoriteCountGroup( );

    int findlikeCountGroupId(int Id);

    void addfavoritepost(int postId);

    void addfavoritecount(int favoriteCountGroupId,int userId);

    void deletelikepost(int postId);

    void deletelikecount(int likeCountGroupId,int userId);

    void deletefavoritepost(int postId);

    void deletefavoritecount(int favoriteCountGroupId,int userId);

    int findfavoriteCountGroupId(int Id);

    int  findimageGroupId(int postId);

    List<Integer> findfavoritecountGroupIdByuserid(int userId);

    Post findPostByfavoritecountGroupId(int favoritecountGroupId);

//    删除帖子
    void deletePost(int postId);
//    关注好友
    void insertUserFollow(int userId, int followUserId);

    void deleteUserFollow(int userId, int followUserId);
}
