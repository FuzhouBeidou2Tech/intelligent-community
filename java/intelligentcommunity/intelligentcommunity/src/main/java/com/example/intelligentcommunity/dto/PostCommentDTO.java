package com.example.intelligentcommunity.dto;


import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.Post;
import lombok.Data;

import java.util.List;

@Data
public class PostCommentDTO {
    private Post post;
    private List<CommentDTO> commentdto;

    private List<Image> imageList;
    private String username;


}

