package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Activity;
import com.example.intelligentcommunity.dao.OfflineActivity;
import com.example.intelligentcommunity.dao.OfflineSignup;
import com.example.intelligentcommunity.dto.ActivityDTO;
import com.example.intelligentcommunity.dto.OfflineActivityDTO;

import java.util.List;

public interface ActivityService {
//    获取进行中的活动列表
    List<ActivityDTO> getproceedActivities(Integer userId);
//获取结束的活动列表
    List<ActivityDTO> getfinshActivities();
//获取线下活动表
    OfflineActivityDTO getOfflineActivity(Integer offlineActivityId,Integer activityId);
//根据id获取活动表
    Activity getActivityById(Integer Id);
//插入线下报名表id
    void insertOfflineSignup(OfflineSignup offlineSignup);

//获取活动标题
    List<Activity> getActivitiesTitle();
//    根据activityid查找线下活动表
    ActivityDTO getActivitiyDTO(int activityId,int userId);
//删除活动表
    void deleteActivity(Integer activityId,Integer offlineActivityId);

    void updateactivity(ActivityDTO activityDTO);
//    发布活动
    void insertActivity(ActivityDTO activityDTO);
}
