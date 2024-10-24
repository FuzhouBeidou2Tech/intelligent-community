package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Activity;
import com.example.intelligentcommunity.dao.OfflineActivity;
import com.example.intelligentcommunity.dao.OfflineSignup;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.ActivityDTO;
import com.example.intelligentcommunity.dto.OfflineActivityDTO;
import com.example.intelligentcommunity.service.ActivityService;
import com.example.intelligentcommunity.service.ImageService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/Activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @Autowired
    ImageService imageService;
    @GetMapping("getActivities")
    public Result<List<Activity>> getAllActivities() {
        try {
            return Result.success(activityService.getActivitiesTitle());
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }


    @GetMapping("getproceedActivities")
    public Result<List<ActivityDTO>> getproceedActivities(@RequestParam Integer userId) {
        try {
            return Result.success(activityService.getproceedActivities(userId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("getfinshActivities")
    public Result<List<ActivityDTO>> getfinshActivities(){
        try {
            return Result.success(activityService.getfinshActivities());
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("getOfflineActivity")
    public Result<OfflineActivityDTO> getOfflineActivity(@RequestParam Integer offlineActivityId, @RequestParam Integer activityId){
        try {
            if(offlineActivityId == null){
                System.out.println("线上活动");
            }
            return Result.success(activityService.getOfflineActivity(offlineActivityId,activityId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PostMapping("insertOfflineSignup")
    public Result insertOfflineSignup(@RequestBody OfflineSignup offlineSignup){
        try {
            activityService.insertOfflineSignup(offlineSignup);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }


    @GetMapping("getActivityDTO")
    public Result<ActivityDTO> getActivityDTOById(@RequestParam Integer activityId,int userId){
        try {
            return Result.success(activityService.getActivitiyDTO(activityId,userId));
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PutMapping("deleteactivity")
    public Result deleteActivity(@RequestParam Integer activityId,@RequestParam Integer offlineActivityId){
        try {
            activityService.deleteActivity(activityId,offlineActivityId);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PostMapping("updateactivity")
    public Result updateActivity(@RequestBody ActivityDTO activityDTO){
        try {
            activityService.updateactivity(activityDTO);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/inserimage")
    public Result<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("进去");
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String url = AliOssUtil.uploadFile(filename, file.getInputStream());

        // 假设简单返回文件地址
        return Result.success(url);
    }
    @PostMapping("addactivity")
    public Result addActivity(@RequestBody ActivityDTO activityDTO){
        try {

            //创建图片组,点赞组，收藏组id

            activityService.insertActivity(activityDTO);
            return Result.success("添加成功");
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
}
