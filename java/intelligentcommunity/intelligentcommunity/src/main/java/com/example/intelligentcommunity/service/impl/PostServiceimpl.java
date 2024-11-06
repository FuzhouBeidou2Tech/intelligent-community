package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.FavoriteCountGroup;
import com.example.intelligentcommunity.dao.LikeCount;
import com.example.intelligentcommunity.dao.LikeCountGroup;
import com.example.intelligentcommunity.dao.Post;
import com.example.intelligentcommunity.dto.CommentDTO;
import com.example.intelligentcommunity.dto.PostCommentDTO;
import com.example.intelligentcommunity.dto.PostRequestDTO;
import com.example.intelligentcommunity.exception.GlobalCommonException;
import com.example.intelligentcommunity.mapper.CommentMapper;
import com.example.intelligentcommunity.mapper.PostMapper;
import com.example.intelligentcommunity.mapper.UserMapper;
import com.example.intelligentcommunity.service.ImageService;
import com.example.intelligentcommunity.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.time.Instant;

@Service
public class PostServiceimpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageService imageService;
    // 定义日期格式
    private static final DateTimeFormatter OUTPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 格式化日期方法
    private String formatDateTime(String isoDateTime) {
        ZonedDateTime zdt = ZonedDateTime.parse(isoDateTime);
        return OUTPUT_FORMATTER.format(zdt);
    }

    @Override
    public List<Post> findPosts(Integer communityId) {


        // 对每个 Post 的日期字段进行格式化
        return postMapper.findPosts(communityId);
    }

    @Override
    public List<PostRequestDTO> findPostAll(int userId) {
         List<PostRequestDTO> postRequestDTOS= postMapper.findPostAll().stream().map(post -> {
             PostRequestDTO postRequestDTO = new PostRequestDTO();
             postRequestDTO.setId(post.getId());
             postRequestDTO.setTitle(post.getTitle());
             postRequestDTO.setAuthor(post.getAuthor());
             postRequestDTO.setContent(post.getContent());
             postRequestDTO.setCreatedAt(post.getCreatedAt());
             postRequestDTO.setUpdatedAt(post.getUpdatedAt());
             postRequestDTO.setCommentCount(post.getCommentCount());
             postRequestDTO.setFavoriteCount(post.getFavoriteCount());
             postRequestDTO.setViewCount(post.getViewCount());
             postRequestDTO.setImageGroupId(post.getImageGroupId());
             postRequestDTO.setUserId(post.getUserId());
             postRequestDTO.setCommunityId(post.getCommunityId());
             postRequestDTO.setLikeCount(post.getLikeCount());
             postRequestDTO.setLikeCountGroupId(post.getLikeCountGroupId());
             postRequestDTO.setFavoriteCountGroupId(post.getFavoriteCountGroupId());
             postRequestDTO.setImageList(imageService.findImageByGroupId(post.getImageGroupId()));
             //判断当前用户是否点赞收藏
             if(postMapper.selectLikeCount(post.getLikeCountGroupId(),userId)!=null){
                 postRequestDTO.setIflike(1);
             }else{
                 postRequestDTO.setIflike(0);
             }
             if(postMapper.selectfavoriteCount(post.getFavoriteCountGroupId(),userId)!=null){
                 postRequestDTO.setIffavorite(1);
             }else{
                 postRequestDTO.setIffavorite(0);
             }
            //判断用户是否关注用户
            if(postMapper.findUserFollow(userId,post.getUserId())!=null){
                postRequestDTO.setIffollow(1);
            }else{
                postRequestDTO.setIffollow(0);
            }
             return postRequestDTO;
                 }).collect(Collectors.toList());

        System.out.println("postRequestDTOS1日记文件"+postRequestDTOS);
        return postRequestDTOS;

    }

    @Override
    public PostCommentDTO finPostByid(int Id) {
        PostCommentDTO postCommentDTO=new PostCommentDTO();

        Instant now = Instant.now();

        List<CommentDTO> commentdtos= commentMapper.getCommentById(Id).stream().map(comment->{

                    CommentDTO commentDTO=new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setContent(comment.getContent());
                    commentDTO.setPostId(comment.getPostId());
                    commentDTO.setUserId(comment.getUserId());
                    commentDTO.setCreatedAt(comment.getCreatedAt());
                    commentDTO.setUpdatedAt(comment.getUpdatedAt());
                    commentDTO.setUsername(userMapper.findNameByid(comment.getUserId()));

                     // 获取 `updatedAt` 属性
                    Instant updatedAt = comment.getUpdatedAt().toInstant();

                    // 计算剩余时间 (单位: 毫秒)
                    long residue = Duration.between(updatedAt, now).toMillis();
                    // 转换为人类可读格式
                    String formattedResidue = formatResidueTime(residue);
                    commentDTO.setFormattedResidue(formattedResidue);

            return commentDTO;
                }
        ).collect(Collectors.toList());
        postCommentDTO.setCommentdto(commentdtos);
        postCommentDTO.setUsername(userMapper.findNameByid(Id));
        postCommentDTO.setPost(postMapper.finPostByid(Id));
        postCommentDTO.setImageList(imageService.findImageByGroupId(postMapper.findimageGroupId(Id)));
        return postCommentDTO;
    }

    @Override
    public List<Post> findPostByuserid(int userId) {
        return postMapper.findPostByuserid(userId);
    }

    @Override
    public void addlikecount(int likeCountGroupId,int userId) {
        if(postMapper.selectLikeCount(likeCountGroupId,userId)==null){
            postMapper.addlikecount(likeCountGroupId,userId);
        }

    }

    @Override
    public void deletelikecount(int likeCountGroupId, int userId) {
            postMapper.deletelikecount(likeCountGroupId,userId);
    }

    @Override
    public void addfavoritecount(int favoriteCountGroupId, int userId) {
        if(postMapper.selectfavoriteCount(favoriteCountGroupId,userId)==null){
            postMapper.addfavoritecount(favoriteCountGroupId,userId);
        }

    }

    @Override
    public void deletelikepost(int postId) {
        postMapper.deletelikepost(postId);
    }

    @Override
    public void addlikepost(int postId) {
        postMapper.addlikepost(postId);
    }

    @Override
    public void addpost(Post post) {
        postMapper.addpost(post);
    }

    @Override
    public Integer insertLikeCountGroup() {
        LikeCountGroup likeCountGroup=new LikeCountGroup();
        postMapper.insertLikeCountGroup(likeCountGroup);
        return likeCountGroup.getId();
    }

    @Override
    public Integer insertFavoriteCountGroup() {
        FavoriteCountGroup favoriteCountGroup=new FavoriteCountGroup();
        postMapper.insertFavoriteCountGroup(favoriteCountGroup);
        return favoriteCountGroup.getId();
    }

    @Override
    public int findlikeCountGroupId(int Id) {
        return postMapper.findlikeCountGroupId(Id);
    }

    @Override
    public void addfavoritepost(int postId) {
        postMapper.addfavoritepost(postId);
    }
    @Override
    public void deletefavoritepost(int postId) {
        postMapper.deletefavoritepost(postId);
    }
    @Override
    public void deletefavoritecount(int favoriteCountGroupId, int userId) {
        postMapper.deletefavoritecount(favoriteCountGroupId,userId);
    }

    @Override
    public int findfavoriteCountGroupId(int Id) {
        return postMapper.findfavoriteCountGroupId(Id);
    }

    @Override
    public int findimageGroupId(int postId) {
        return postMapper.findimageGroupId(postId);
    }

    @Override
    public List<Integer> findfavoritecountGroupIdByuserid(int userId) {
        return postMapper.findfavoritecountGroupIdByuserid(userId);
    }

    @Override
    public Post findPostByfavoritecountGroupId(int favoritecountGroupId) {
        return postMapper.findPostByfavoritecountGroupId(favoritecountGroupId);
    }

    @Override
    public void deletePost(int postId) {
        postMapper.deletePost(postId);

    }

    @Override
    public void insertUserFollow(int userId, int followUserId) {
        if(postMapper.findUserFollow(userId,followUserId)==null){
            postMapper.insertUserFollow(userId,followUserId);
        }else{
            throw new GlobalCommonException("更新失败,数据库中已存在信息");
        }

    }

    @Override
    public void deleteUserFollow(int userId, int followUserId) {
        if(postMapper.findUserFollow(userId,followUserId)!=null) {
            postMapper.deleteUserFollow(userId, followUserId);
        }else{
            throw new GlobalCommonException("更新失败,数据库中已存在信息");
        }
    }


    // 将残余时间转换为格式化的时间字符串
    private String formatResidueTime(long residue) {
        // 将毫秒转换为秒
        long seconds = residue / 1000;

        // 计算天数
        long days = seconds / (24 * 60 * 60);
        seconds %= 24 * 60 * 60;

        // 计算小时
        long hours = seconds / (60 * 60);
        seconds %= 60 * 60;

        // 计算分钟
        long minutes = seconds / 60;
        seconds %= 60;

        // 字符串格式化
        return String.format("%d天 %d小时 %d分钟 %d秒", days, hours, minutes, seconds);
    }

}
