package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PutMapping("/addcomment")
    public Result insertComment(@RequestParam int postId, int userId, String content){
        try {
            commentService.insertComment(postId, userId, content);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
}
