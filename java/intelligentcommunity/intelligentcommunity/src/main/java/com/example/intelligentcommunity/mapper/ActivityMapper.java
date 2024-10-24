package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Activity;
import com.example.intelligentcommunity.dao.OfflineActivity;
import com.example.intelligentcommunity.dao.OfflineSignup;
import com.example.intelligentcommunity.dto.ActivityDTO;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface ActivityMapper {
//获取进行中的活动
    @Select("SELECT * FROM activity WHERE end_time >= NOW() ORDER BY created_at DESC")
    List<Activity> getproceedActivities();
//获取结束的活动
    @Select("SELECT * FROM activity WHERE end_time < NOW() ORDER BY created_at DESC")
    List<Activity> getfinshActivities();
//获取标题活动
    @Select("(SELECT * FROM activity WHERE end_time >= NOW() ORDER BY created_at DESC LIMIT 2) " +
            "UNION ALL " +
            "(SELECT * FROM activity WHERE end_time < NOW() ORDER BY created_at DESC LIMIT 2) " +
            "ORDER BY end_time >= NOW() DESC, created_at DESC " +
            "LIMIT 2;")
    List<Activity> getActivitiesTitle();

//获取线下活动表
    @Select("select * from offlineactivity where id=#{Id}")
    OfflineActivity getOfflineActivity(Integer Id);

//根据id获取活动表
    @Select("select * from activity where id=#{Id}")
    Activity getActivityById(Integer Id);
//添加线下报名表
    @Insert("insert into offlinesignup(offline_activity_id,user_id,user_name,user_phone,emergency_contact_name,emergency_contact_phone,created_at)" +
            "values (#{offlineActivityId},#{userId},#{userName},#{userPhone},#{emergencyContactName},#{emergencyContactPhone},now())")
    void insertOfflineSignup(OfflineSignup offlineSignup);
//    根据activityid获取报名人数
    @Select("select signup_count from offlineactivity where activity_id=#{activityId}")
    int findsignupcount(Integer activityId);

//    根据activityid获取最大报名人数
    @Select("select signup_count_max from offlineactivity where activity_id=#{activityId}")
    int findsignupcountmax(Integer activityId);
//根据activityid获取最获取报名截止时间
    @Select("select signup_end_time from offlineactivity where activity_id=#{activityId}")
    Timestamp findsignupEndTime(Integer activityId);
//获取集合地点
@Select("select gathering_place from offlineactivity where activity_id=#{activityId}")
    String findgatheringplace(Integer activityId);
//获取报名费
@Select("select signup_fee from offlineactivity where activity_id=#{activityId}")
    BigDecimal findsignupFee(Integer activityId);
//    获取集合时间
@Select("select  gathering_time from offlineactivity where activity_id=#{activityId}")
    Timestamp findgatheringTime(Integer activityId);
//    根据activityid获取最获取报名开始时间
@Select("select signup_start_time from offlineactivity where activity_id=#{activityId}")
    Timestamp findsignupStartTime(Integer activityId);
//添加报名人数
    @Update("update offlineactivity set signup_count=signup_count+1 where id=#{offlineactivityId}")
    void addsignupcount(Integer offlineactivityId);

//查找报名表
    @Select("select * from offlinesignup where offline_activity_id=#{offlineActivityId} and user_id=#{userId}")
    OfflineSignup getofflineSignup(Integer offlineActivityId,Integer userId);

//删除活动表
    @Delete("delete from activity where id=#{activityId}")
    void deleteActivity(Integer activityId);
    //删除线下报名表
    @Delete("delete from offlineactivity where activity_id=#{activityId}")
    void deleteOffineshActivity(Integer activityId);
    //删除线下报名用户表
    @Delete("delete from offlinesignup where offline_activity_id=#{offlineActivityId}")
    void deleteOfflineSignup(int offlineActivityId);


//
@Update({
        "<script>",
        "UPDATE activity",
        "<set>",
        "<if test='offlineActivityId != null'> offline_activity_id = #{offlineActivityId}, </if>",
        "<if test='imageGroupId != null'> image_group_id = #{imageGroupId}, </if>",
        "<if test='views != null'> views = #{views}, </if>",
        "<if test='favorites != null'> favorites = #{favorites}, </if>",
        "<if test='startTime != null'> start_time = #{startTime}, </if>",
        "<if test='endTime != null'> end_time = #{endTime}, </if>",
        "<if test='type != null'> type = #{type}, </if>",
        "<if test='address != null'> address = #{address}, </if>",
        "<if test='name != null'> name = #{name}, </if>",
        "<if test='subtitle != null'> subtitle = #{subtitle}, </if>",
        "<if test='details != null'> details = #{details}, </if>",
        "<if test='organizer != null'> organizer = #{organizer}, </if>",
        "<if test='organizerPhone != null'> organizer_phone = #{organizerPhone}, </if>",
        "<if test='titleImage != null'> title_image = #{titleImage}, </if>",
        "</set>",
        "WHERE id = #{id}",
        "</script>"
})
void updateActivity(Activity activity);

    @Update({
            "<script>",
            "UPDATE offlineactivity",
            "<set>",
            "<if test='activityId != null'> activity_id = #{activityId}, </if>",
            "<if test='gatheringPlace != null'> gathering_place = #{gatheringPlace}, </if>",
            "<if test='gatheringTime != null'> gathering_time = #{gatheringTime}, </if>",
            "<if test='signupStartTime != null'> signup_start_time = #{signupStartTime}, </if>",
            "<if test='signupEndTime != null'> signup_end_time = #{signupEndTime}, </if>",
            "<if test='signupCountMax != null'> signup_count_max = #{signupCountMax}, </if>",
            "<if test='signupFee != null'> signup_fee = #{signupFee}, </if>",
            "</set>",
            "WHERE id = #{id}",
            "</script>"
    })
    void updateofflineActivity(OfflineActivity offlineActivity);


    @Insert("INSERT INTO activity (offline_activity_id, image_group_id, views, favorites, start_time, end_time, type, address, name, subtitle, details, organizer, organizer_phone, title_image) " +
            "VALUES (#{offlineActivityId}, #{imageGroupId}, #{views}, #{favorites}, #{startTime}, #{endTime}, #{type}, #{address}, #{name}, #{subtitle}, #{details}, #{organizer}, #{organizerPhone}, #{titleImage})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertActivity(Activity activity);

    @Insert("INSERT INTO offlineactivity (activity_id, gathering_place, gathering_time, signup_start_time, signup_end_time, signup_count, signup_fee,signup_count_max) " +
            "VALUES (#{activityId}, #{gatheringPlace}, #{gatheringTime}, #{signupStartTime}, #{signupEndTime}, #{signupCount}, #{signupFee},#{signupCountMax})")
    @Options(useGeneratedKeys = true, keyProperty = "id")  // 自动获取生成的主键
    void insertOfflineActivity(OfflineActivity offlineActivity);

    @Update("update offlineactivity  set activity_id=#{activityid} where id=#{offlineactivityid}")
    void updateactivityid(Integer activityid,Integer offlineactivityid);
}
