package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Friendship;
import com.example.intelligentcommunity.dto.FriendshipDTO;

import java.util.List;

public interface FriendshipService {

    List<FriendshipDTO> getFriendships(int userId);

    void addFriendship(int user1Id,int user2Id);

    Friendship findFriendship(int user1Id,int user2Id);

    void agreeFriendship(int user1Id, int user2Id);

    void refuseFriendship(int user1Id, int user2Id);

    void reloadFriendship(int user1Id, int user2Id);
}
