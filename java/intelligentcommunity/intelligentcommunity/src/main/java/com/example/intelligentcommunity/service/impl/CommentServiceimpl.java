package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.mapper.CommentMapper;
import com.example.intelligentcommunity.mapper.PostMapper;
import com.example.intelligentcommunity.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentServiceimpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PostMapper postMapper;

    @Override
    @Transactional
    public void insertComment(int postId, int userId, String content) {
        commentMapper.insertComment(postId, userId, content);
        postMapper.addcommentcount(postId);
    }
}
