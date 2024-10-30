package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Post;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.PostCommentDTO;
import com.example.intelligentcommunity.dto.PostDTO;
import com.example.intelligentcommunity.dto.PostRequestDTO;
import com.example.intelligentcommunity.service.ImageService;
import com.example.intelligentcommunity.service.PostService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Post")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    ImageService imageService;

    @GetMapping("/getposts")
    public Result<List<Post>> getposts(Integer communityId){
        try {
            return Result.success(postService.findPosts(communityId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    //获取社区论坛
    @GetMapping("/getpostsAll")
    public Result<List<PostRequestDTO>> getpostsall(@RequestParam int userId){
        try {
            return Result.success(postService.findPostAll(userId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/getpostByid")
    public Result<PostCommentDTO> finPostByid(@RequestParam int Id){
        try{
            return Result.success(postService.finPostByid(Id));
        }catch(Exception e){
            return Result.error(e.getMessage());
        }
    }
    @GetMapping("/getpostByuserid")
    public Result<List<Post>> finPostByUserid(@RequestParam int userId){
        try {
            return Result.success(postService.findPostByuserid(userId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("addlikecount")
    public Result addPostlikecount(@RequestParam int postId ,int userid){
        try {

            int likeCountGroupId=postService.findlikeCountGroupId(postId);
            postService.addlikecount(likeCountGroupId,userid);
            postService.addlikepost(postId);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/inserimage")
    public Result<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("进去");
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String url = AliOssUtil.uploadFile(filename, file.getInputStream());
        // 假设简单返回文件地址
        return Result.success(url);
    }

    @PostMapping("/addPost")
    public Result addPost(@RequestBody PostDTO postdto){
        try{
            Post post = new Post();
            post.setTitle(postdto.getTitle());
            post.setAuthor(postdto.getAuthor());
            post.setContent(postdto.getContent());
            post.setUserId(postdto.getUserId());
            post.setCommunityId(postdto.getCommunityId());
            //创建图片组,点赞组，收藏组id
            int imageId = imageService.createImageGroupAndGetId();
            int likegroupId=postService.insertLikeCountGroup();
            int favoritegroupId=postService.insertFavoriteCountGroup();
            post.setImageGroupId(imageId);
            post.setLikeCountGroupId(likegroupId);
            post.setFavoriteCountGroupId(favoritegroupId);

            //数据库存储post
            postService.addpost(post);

            for (String url : postdto.getImagePaths()) {
                Image image = new Image();
                image.setImageUrl(url);
                image.setImageGroupId(imageId);
                image.setDescription("帖子图片");
                imageService.insertImage(image);
            }
            return Result.success("帖子创建成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }

    }

    @PutMapping("addlike")
    public Result addlikecount(@RequestParam int postId,int userId){
        try {
            postService.addlikecount(postService.findlikeCountGroupId(postId),userId);
            postService.addlikepost(postId);
            return Result.success("添加点赞成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PutMapping("addfavorite")
    public Result addfavorite(@RequestParam int postId,int userId){
        try {
            postService.addfavoritecount(postService.findfavoriteCountGroupId(postId),userId);
            postService.addfavoritepost(postId);
            return Result.success("添加收藏成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PutMapping("deletelike")
    public Result deletelike(@RequestParam int postId,int userId){
        try {
            postService.deletelikecount(postService.findlikeCountGroupId(postId),userId);
            postService.deletelikepost(postId);
            return Result.success("删除点赞成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("deletefavorite")
    public Result deletefavorite(@RequestParam int postId,int userId){
        try {
            postService.deletefavoritecount(postService.findfavoriteCountGroupId(postId),userId);
            postService.deletefavoritepost(postId);
            return Result.success("取消收藏成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("getfavoritepost")
    public Result<List<Post>> getPostList(@RequestParam int userId){
        try {
            List<Integer> favoriteGroupIdList=postService.findfavoritecountGroupIdByuserid(userId);
            List<Post> postList= favoriteGroupIdList.stream().map(favoritecountGroupId->{
                Post post=postService.findPostByfavoritecountGroupId(favoritecountGroupId);
                return post;
                    }).collect(Collectors.toList());
            return Result.success(postList);
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("deletePost")
    public Result deletePost(@RequestParam int postId){
        try {
            postService.deletePost(postId);
            return Result.success("删除成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("addFollow")
    public Result insertUserFollow(@RequestParam int userId,@RequestParam int followuserId){
        try {
            postService.insertUserFollow(userId,followuserId);
            return Result.success("关注成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("unFollow")
    public Result deleteUserFollow(@RequestParam int userId,@RequestParam int followuserId){
        try {
            postService.deleteUserFollow(userId,followuserId);
            return Result.success("取消关注");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

}
