package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.dao.Result;
import com.example.intelligentcommunity.dto.ComplaintDTO;
import com.example.intelligentcommunity.dto.ComplaintRequest;
import com.example.intelligentcommunity.service.ComplaintService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/Complain")
public class ComplainController {
    @Autowired
    private ComplaintService complaintService;
    @GetMapping("getComplainall")
    public Result<List<ComplaintDTO>> getComplainall(@RequestParam int userId){
        try {
            return Result.success(complaintService.findComplaintByuserId(userId));
        }catch (Exception e){
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
    @PostMapping("/addComplain")
    public Result addComplain(@RequestBody  ComplaintRequest complaintrequest){
        try {
            complaintService.insertComplaint(complaintrequest);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
    @PutMapping("deleteComplain")
    public Result deleteComplain(@RequestParam int Id){
        try {
            complaintService.deleteComplaint(Id);
            return Result.success();
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
//    获取全部投诉建议
    @GetMapping("getComplainallnoId")
    public Result<List<ComplaintDTO>> getComplainallnoId(){
        try {
            return Result.success(complaintService.findAllComplaints());
        }catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    //   处理中
    @PutMapping("SetINPROGRESS")
    public Result setINPROGRESS(@RequestParam int Id) {
        try {
            complaintService.updateINPROGRESS(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    //处理完成
    @PutMapping("SetCOMPLETED")
    public Result setCOMPLETED(@RequestParam int Id) {
        try {
            complaintService.updateCOMPLETED(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    //审核失败
    @PutMapping("SetREJECTED")
    public Result setREJECTED(@RequestParam int Id) {
        try {
            complaintService.updateREJECTED(Id);
            return Result.success();
        }catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
