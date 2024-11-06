package com.example.intelligentcommunity.dto;

import com.example.intelligentcommunity.dao.Friendship;
import com.example.intelligentcommunity.dao.Message;
import lombok.Data;

import java.util.List;

@Data
public class FriendshipDTO extends Friendship {
    //用户名字
    private String user1Name;
    //记录最后的消息
    private String lastmessage;

    private List<Message> unreadMessageList;

    //记录未读显示条数
    private int unreadMessageCount;
//最后一条信息是否为图片
    private boolean ifimage;
//    用户头像
    private String friendimage;
}
