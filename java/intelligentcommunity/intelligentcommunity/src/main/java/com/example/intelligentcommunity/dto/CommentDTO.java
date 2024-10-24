package com.example.intelligentcommunity.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDTO {
    private int id;

    private int postId;

    private int userId;

    private String content;

    private Date createdAt;

    private Date updatedAt;

    private String username;

//    private long residue;

    private String formattedResidue;
}
