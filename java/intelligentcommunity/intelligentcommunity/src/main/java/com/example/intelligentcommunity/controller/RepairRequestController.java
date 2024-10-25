package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dao.RepairRequest;
import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.RepairRequestDTO;
import com.example.intelligentcommunity.dto.RepairRequestRequest;
import com.example.intelligentcommunity.service.ImageService;
import com.example.intelligentcommunity.service.RepairRequestService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/RepairRequest")
public class RepairRequestController {
    @Autowired
    RepairRequestService repairRequestService;

    @Autowired
    ImageService imageService;

    @GetMapping("/getRepair")
    public Result<List<RepairRequestDTO>> getAllRepairRequest(@RequestParam int userId) {
        try {
            return Result.success(repairRequestService.getRepairRequests(userId));
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

    @PostMapping("/addRepair")
    public Result addRepairRequest(@RequestBody RepairRequestRequest repairRequestRequest) {
        try {
            RepairRequest repairRequest=new RepairRequest();


            int imageId = imageService.createImageGroupAndGetId();
            repairRequest.setImageGroupId(imageId);
            repairRequest.setRepairType(repairRequestRequest.getRepairType());
            repairRequest.setRepairAddress(repairRequestRequest.getRepairaddress());
            repairRequest.setDescription(repairRequestRequest.getRepairdescription());
            repairRequest.setUserId(repairRequestRequest.getUserid());

            for(String url:repairRequestRequest.getImagePaths()){
                Image image = new Image();
                image.setImageUrl(url);
                image.setImageGroupId(imageId);
                image.setDescription("报修图片");
                imageService.insertImage(image);
            }
            repairRequestService.addRepairRequest(repairRequest);
            return Result.success("成功");
        }catch(Exception e) {
            return Result.error(e.getMessage());
        }


    }

    @PutMapping("/deleteRepair")
    public Result deleteRepairRequest(@RequestParam int Id) {
        try {
            repairRequestService.deleterepairRequest(Id);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("getRepairAll")
   public Result<List<RepairRequestDTO>> getRepairRequestsall(){
        try {
            return Result.success(repairRequestService.getRepairRequestsall());
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
   }
//   处理中
    @PutMapping("SetINPROGRESS")
   public Result setINPROGRESS(@RequestParam int Id) {
        try {
            repairRequestService.updateRepairsINPROGRESS(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
   }
//处理完成
    @PutMapping("SetCOMPLETED")
    public Result setCOMPLETED(@RequestParam int Id) {
        try {
            repairRequestService.updateRepairsCOMPLETED(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
//审核失败
    @PutMapping("SetREJECTED")
    public Result setREJECTED(@RequestParam int Id) {
        try {
            repairRequestService.updateRepairsREJECTED(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}


