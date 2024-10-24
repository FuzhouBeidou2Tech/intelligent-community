package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Activity;
import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.OfflineActivity;
import com.example.intelligentcommunity.dao.OfflineSignup;
import com.example.intelligentcommunity.dto.ActivityDTO;
import com.example.intelligentcommunity.dto.OfflineActivityDTO;
import com.example.intelligentcommunity.mapper.ActivityMapper;
import com.example.intelligentcommunity.mapper.ImageMapper;
import com.example.intelligentcommunity.service.ActivityService;
import com.example.intelligentcommunity.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityServiceimpl implements ActivityService {

    @Autowired
    private ActivityMapper activityMapper;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageMapper imageMapper;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Override
    public List<ActivityDTO> getproceedActivities(Integer userId) {
        return activityMapper.getproceedActivities().stream().map(activity->{
            ActivityDTO activityDTO=new ActivityDTO();
            activityDTO.setId(activity.getId());
            activityDTO.setOfflineActivityId(activity.getOfflineActivityId());
            activityDTO.setImageGroupId(activity.getImageGroupId());
            activityDTO.setViews(activity.getViews());
            activityDTO.setFavorites(activity.getFavorites());
//            转换时间格式
            activityDTO.setStartTime(activity.getStartTime() != null ? dateFormat.format(activity.getStartTime()) : null);
            activityDTO.setEndTime(activity.getEndTime() != null ? dateFormat.format(activity.getEndTime()) : null);
            activityDTO.setType(activity.getType());
            activityDTO.setAddress(activity.getAddress());
            activityDTO.setName(activity.getName());
            activityDTO.setTitleImage(activity.getTitleImage());
            activityDTO.setDetails(activity.getDetails());
            activityDTO.setOrganizer(activity.getOrganizer());
            activityDTO.setOrganizerPhone(activity.getOrganizerPhone());
            activityDTO.setSignupCount(activityMapper.findsignupcount(activity.getId()));
            activityDTO.setSignupCountMax(activityMapper.findsignupcountmax(activity.getId()));
            activityDTO.setImageList(imageMapper.findImageByGroupId(activity.getImageGroupId()));
            activityDTO.setSubtitle(activity.getSubtitle());
            activityDTO.setGatheringPlace(activityMapper.findgatheringplace(activity.getId()));
            activityDTO.setSignupFee(activityMapper.findsignupFee(activity.getId()));
            activityDTO.setGatheringTime(dateFormat.format(activityMapper.findgatheringTime(activity.getId())));
            activityDTO.setSignupStartTime(dateFormat.format(activityMapper.findsignupStartTime(activity.getId())));
            activityDTO.setSignupEndTime(dateFormat.format(activityMapper.findsignupEndTime(activity.getId())));
            if(activityMapper.getofflineSignup(activity.getOfflineActivityId(),userId)==null){
                activityDTO.setIfsignup(false);
            }else{
                activityDTO.setIfsignup(true);
            }

            // 获取报名结束时间并转换格式
            Date signupEndTime = activityMapper.findsignupEndTime(activity.getId());
            if (signupEndTime != null) {
                activityDTO.setSignupEndTime(dateFormat.format(signupEndTime));

                // 比较报名结束时间和当前时间
                if (signupEndTime.after(new Date())) {
                    activityDTO.setIfovertime(false);
                } else {
                    activityDTO.setIfovertime(true);
                }
            } else {
                activityDTO.setSignupEndTime(null);
                activityDTO.setIfovertime(true); // 如果报名结束时间为空，默认算作时间已过
            }
            return activityDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ActivityDTO> getfinshActivities() {
        return activityMapper.getfinshActivities().stream().map(activity->{
            ActivityDTO activityDTO=new ActivityDTO();
            activityDTO.setId(activity.getId());
            activityDTO.setOfflineActivityId(activity.getOfflineActivityId());
            activityDTO.setImageGroupId(activity.getImageGroupId());
            activityDTO.setViews(activity.getViews());
            activityDTO.setFavorites(activity.getFavorites());
            //            转换时间格式
            activityDTO.setStartTime(activity.getStartTime() != null ? dateFormat.format(activity.getStartTime()) : null);
            activityDTO.setEndTime(activity.getEndTime() != null ? dateFormat.format(activity.getEndTime()) : null);
            activityDTO.setType(activity.getType());
            activityDTO.setAddress(activity.getAddress());
            activityDTO.setName(activity.getName());
            activityDTO.setTitleImage(activity.getTitleImage());
            activityDTO.setDetails(activity.getDetails());
            activityDTO.setOrganizer(activity.getOrganizer());
            activityDTO.setOrganizerPhone(activity.getOrganizerPhone());
            activityDTO.setSignupCount(activityMapper.findsignupcount(activity.getId()));
            activityDTO.setSignupCountMax(activityMapper.findsignupcountmax(activity.getId()));
            activityDTO.setImageList(imageMapper.findImageByGroupId(activity.getImageGroupId()));
            activityDTO.setSubtitle(activity.getSubtitle());
            activityDTO.setGatheringPlace(activityMapper.findgatheringplace(activity.getId()));
            activityDTO.setSignupFee(activityMapper.findsignupFee(activity.getId()));
            activityDTO.setGatheringTime(dateFormat.format(activityMapper.findgatheringTime(activity.getId())));
            activityDTO.setSignupStartTime(dateFormat.format(activityMapper.findsignupStartTime(activity.getId())));
            activityDTO.setSignupEndTime(dateFormat.format(activityMapper.findsignupEndTime(activity.getId())));

            // 获取报名结束时间并转换格式
            Date signupEndTime = activityMapper.findsignupEndTime(activity.getId());
            if (signupEndTime != null) {
                activityDTO.setSignupEndTime(dateFormat.format(signupEndTime));

                // 比较报名结束时间和当前时间
                if (signupEndTime.after(new Date())) {
                    activityDTO.setIfovertime(false);
                } else {
                    activityDTO.setIfovertime(true);
                }
            } else {
                activityDTO.setSignupEndTime(null);
                activityDTO.setIfovertime(true); // 如果报名结束时间为空，默认算作时间已过
            }
            return activityDTO;
        }).collect(Collectors.toList());

    }

    @Override
    public OfflineActivityDTO getOfflineActivity(Integer offlineActivityId,Integer activityId) {
        OfflineActivityDTO offlineActivityDTO = new OfflineActivityDTO();
        OfflineActivity offlineActivity = activityMapper.getOfflineActivity(offlineActivityId);
        Activity activity = activityMapper.getActivityById(activityId);
        offlineActivityDTO.setName(activity.getName());
        offlineActivityDTO.setGatheringTime(offlineActivity.getGatheringTime() != null ? dateFormat.format(offlineActivity.getGatheringTime()) : null);
        offlineActivityDTO.setGatheringPlace(offlineActivity.getGatheringPlace());
        offlineActivityDTO.setStartTime(activity.getStartTime() != null ? dateFormat.format(activity.getStartTime()) : null);
        offlineActivityDTO.setEndTime(activity.getEndTime() != null ? dateFormat.format(activity.getEndTime()) : null);
        offlineActivityDTO.setSignupEndTime(offlineActivity.getSignupEndTime() !=null ? dateFormat.format(offlineActivity.getSignupEndTime()) : null);
        offlineActivityDTO.setSignupFee(offlineActivity.getSignupFee());
        return offlineActivityDTO;
    }


    @Override
    public Activity getActivityById(Integer Id) {
        return activityMapper.getActivityById(Id);
    }
    @Override
    public void insertOfflineSignup(OfflineSignup offlineSignup){
        if(activityMapper.getofflineSignup(offlineSignup.getOfflineActivityId(),offlineSignup.getUserId())==null){
            activityMapper.addsignupcount(offlineSignup.getOfflineActivityId());
            activityMapper.insertOfflineSignup(offlineSignup);
        }else{
            System.out.println("线下报名表已有数据");
        }
    }

    @Override
    public List<Activity> getActivitiesTitle() {
        return activityMapper.getActivitiesTitle();
    }

    @Override
    public ActivityDTO getActivitiyDTO(int activityId,int userId) {
        ActivityDTO activityDTO=new ActivityDTO();
        Activity activity = activityMapper.getActivityById(activityId);

        OfflineActivity offlineActivity = activityMapper.getOfflineActivity(activity.getOfflineActivityId());

        activityDTO.setId(activity.getId());
        activityDTO.setOfflineActivityId(activity.getOfflineActivityId());
        activityDTO.setImageGroupId(activity.getImageGroupId());
        activityDTO.setViews(activity.getViews());
        activityDTO.setFavorites(activity.getFavorites());
//            转换时间格式
        activityDTO.setStartTime(activity.getStartTime() != null ? dateFormat.format(activity.getStartTime()) : null);
        activityDTO.setEndTime(activity.getEndTime() != null ? dateFormat.format(activity.getEndTime()) : null);
        activityDTO.setType(activity.getType());
        activityDTO.setAddress(activity.getAddress());
        activityDTO.setName(activity.getName());
        activityDTO.setTitleImage(activity.getTitleImage());
        activityDTO.setDetails(activity.getDetails());
        activityDTO.setOrganizer(activity.getOrganizer());
        activityDTO.setOrganizerPhone(activity.getOrganizerPhone());
        activityDTO.setSignupCount(activityMapper.findsignupcount(activity.getId()));
        activityDTO.setSignupCountMax(activityMapper.findsignupcountmax(activity.getId()));
        activityDTO.setImageList(imageMapper.findImageByGroupId(activity.getImageGroupId()));
        activityDTO.setSubtitle(activity.getSubtitle());
        activityDTO.setGatheringPlace(activityMapper.findgatheringplace(activity.getId()));
        activityDTO.setSignupFee(activityMapper.findsignupFee(activity.getId()));
        activityDTO.setGatheringTime(dateFormat.format(activityMapper.findgatheringTime(activity.getId())));
        activityDTO.setSignupStartTime(dateFormat.format(activityMapper.findsignupStartTime(activity.getId())));
        activityDTO.setSignupEndTime(dateFormat.format(activityMapper.findsignupEndTime(activity.getId())));
        if(activityMapper.getofflineSignup(activity.getOfflineActivityId(),userId)==null){
            activityDTO.setIfsignup(false);
        }else{
            activityDTO.setIfsignup(true);
        }

        // 获取报名结束时间并转换格式
        Date signupEndTime = activityMapper.findsignupEndTime(activity.getId());
        if (signupEndTime != null) {
            activityDTO.setSignupEndTime(dateFormat.format(signupEndTime));

            // 比较报名结束时间和当前时间
            if (signupEndTime.after(new Date())) {
                activityDTO.setIfovertime(false);
            } else {
                activityDTO.setIfovertime(true);
            }
        } else {
            activityDTO.setSignupEndTime(null);
            activityDTO.setIfovertime(true); // 如果报名结束时间为空，默认算作时间已过
        }
        return activityDTO;
    }

    @Override
    public void deleteActivity(Integer activityId, Integer offlineActivityId) {
        activityMapper.deleteOfflineSignup(offlineActivityId);
        activityMapper.deleteOffineshActivity(activityId);
        activityMapper.deleteActivity(activityId);
    }

    @Override
    public void updateactivity(ActivityDTO activityDTO) {
        Activity activity = new Activity();
        OfflineActivity offlineActivity = new OfflineActivity();

        // 填充 Activity 对象
        activity.setId(activityDTO.getId());
        activity.setOfflineActivityId(activityDTO.getOfflineActivityId());
        activity.setImageGroupId(activityDTO.getImageGroupId());
        activity.setViews(activityDTO.getViews());
        activity.setFavorites(activityDTO.getFavorites());

        // 假设时间格式转换，如果需要具体格式转换可以使用库如 SimpleDateFormat
        if (activityDTO.getStartTime() != null) {
            activity.setStartTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getStartTime())));
        }
        if (activityDTO.getEndTime() != null) {
            activity.setEndTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getEndTime())));
        }

        activity.setType(activityDTO.getType());
        activity.setAddress(activityDTO.getAddress());
        activity.setName(activityDTO.getName());
        activity.setTitleImage(activityDTO.getTitleImage());
        activity.setDetails(activityDTO.getDetails());
        activity.setOrganizer(activityDTO.getOrganizer());
        activity.setOrganizerPhone(activityDTO.getOrganizerPhone());
        activity.setSubtitle(activityDTO.getSubtitle());

        // 填充 OfflineActivity 对象
        offlineActivity.setId(activityDTO.getOfflineActivityId()); // 根据上下文，这里假设使用相同的 ID
        //offlineActivity.setActivityId(activityDTO.getId()); // 通常活动与线下活动关联
        // 注意到可能数据库中没有max的字段，确保对应关系
        offlineActivity.setGatheringPlace(activityDTO.getGatheringPlace());

        if (activityDTO.getGatheringTime() != null) {
            offlineActivity.setGatheringTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getGatheringTime())));
        }

        if (activityDTO.getSignupStartTime() != null) {
            offlineActivity.setSignupStartTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getSignupStartTime())));
        }

        if (activityDTO.getSignupEndTime() != null) {
            offlineActivity.setSignupEndTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getSignupEndTime())));
        }
        offlineActivity.setSignupFee(activityDTO.getSignupFee()); // 假设一个默认转化值

        // Additional attributes for offlineActivity
        offlineActivity.setSignupCountMax(activityDTO.getSignupCountMax());

        //提交数据库
        activityMapper.updateActivity(activity);
        activityMapper.updateofflineActivity(offlineActivity);
    }

    @Override
    @Transactional
    public void insertActivity(ActivityDTO activityDTO) {

        int imageId = imageService.createImageGroupAndGetId();
        activityDTO.setImageGroupId(imageId);
        Activity activity = new Activity();
        OfflineActivity offlineActivity = new OfflineActivity();
        // 填充 OfflineActivity 对象
        // 注意到可能数据库中没有max的字段，确保对应关系
        offlineActivity.setGatheringPlace(activityDTO.getGatheringPlace());

        if (activityDTO.getGatheringTime() != null) {
            offlineActivity.setGatheringTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getGatheringTime())));
        }

        if (activityDTO.getSignupStartTime() != null) {
            offlineActivity.setSignupStartTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getSignupStartTime())));
        }

        if (activityDTO.getSignupEndTime() != null) {
            offlineActivity.setSignupEndTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getSignupEndTime())));
        }
        offlineActivity.setSignupFee(activityDTO.getSignupFee()); // 假设一个默认转化值

        // Additional attributes for offlineActivity
        offlineActivity.setSignupCountMax(activityDTO.getSignupCountMax());
        activityMapper.insertOfflineActivity(offlineActivity);

        // 填充 Activity 对象
        activity.setOfflineActivityId(offlineActivity.getId());
        activity.setImageGroupId(activityDTO.getImageGroupId());
        activity.setViews(activityDTO.getViews());
        activity.setFavorites(activityDTO.getFavorites());
        // 假设时间格式转换，如果需要具体格式转换可以使用库如 SimpleDateFormat
        if (activityDTO.getStartTime() != null) {
            activity.setStartTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getStartTime())));
        }
        if (activityDTO.getEndTime() != null) {
            activity.setEndTime(Timestamp.valueOf(ensureFullTimestamp(activityDTO.getEndTime())));
        }
        activity.setType(activityDTO.getType());
        activity.setAddress(activityDTO.getAddress());
        activity.setName(activityDTO.getName());
        activity.setTitleImage(activityDTO.getTitleImage());
        activity.setDetails(activityDTO.getDetails());
        activity.setOrganizer(activityDTO.getOrganizer());
        activity.setOrganizerPhone(activityDTO.getOrganizerPhone());
        activity.setSubtitle(activityDTO.getSubtitle());

        for (String url : activityDTO.getImageurlList()) {
            Image image = new Image();
            image.setImageUrl(url);
            image.setImageGroupId(activityDTO.getImageGroupId());
            image.setDescription("帖子图片");
            imageService.insertImage(image);
        }

        activityMapper.insertActivity(activity);
        activityMapper.updateactivityid(activity.getId(), offlineActivity.getId());
    }




    //为时间格式添加秒数
    private String ensureFullTimestamp(String dateTime) {
        if (dateTime.length() == "yyyy-MM-dd HH:mm".length()) {
            return dateTime + ":00";
        }
        return dateTime;
    }
}
