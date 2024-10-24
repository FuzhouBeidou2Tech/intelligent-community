package com.example.intelligentcommunity.mapper;

import com.example.intelligentcommunity.dao.Notification;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface NotificationMapper {

    @Select("SELECT * FROM " +
            "(SELECT * FROM notifications ORDER BY publish_time DESC LIMIT 2)" +
            " AS latest_notifications ORDER BY CASE WHEN urgency_status = 'urgent' THEN 1 ELSE 2 END;")
    List<Notification> notificationTitle();

    @Select("SELECT * from notifications WHERE id=#{Id}")
    Notification findBynotificationinfo(int Id);

    @Select("SELECT * FROM notifications ORDER BY publish_time DESC")
    List<Notification> findNotificationList();

    @Insert("insert into notifications(title,content,type,department,publisher,publish_time,urgency_status,image_group_id)" +
            "values (#{title},#{content},#{type},#{department},#{publisher},now(),#{urgencyStatus},#{imageGroupId})")
    void insertNotification(Notification notification);

    //根据id查找groupID
    @Select("select image_group_id from notifications where id=#{Id}")
    int findNotificationByGroupId(int Id);
}
