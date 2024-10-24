package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.utils.AliOssUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.intelligentcommunity.dao.Result;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/Notice")
public class FileController {

    @PostMapping("/createWithFiles")
    public Result<String> createWithFiles(@RequestParam("file") List<MultipartFile> files,
                                          @RequestParam("noticeType") String noticeType,
                                          @RequestParam("title") String title,
                                          @RequestParam("content") String content,
                                          @RequestParam("department") String department,
                                          @RequestParam("publisher") String publisher,
                                          @RequestParam("urgency_status") String urgency_status) throws Exception {

        // 处理其他表单数据
        System.out.println("Notice Type: " + noticeType);
        System.out.println("Title: " + title);
        System.out.println("Content: " + content);

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();
            String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
            String url = AliOssUtil.uploadFile(filename, file.getInputStream());
            fileUrls.add(url);
            System.out.println("处理成功");
            System.out.println(url);
        }

        // 这里假设合成了一个数据结果与 url，一般情况下你需要更多的业务逻辑来处理这些数据
        return Result.success("上传成功, 文件地址: " + String.join(", ", fileUrls));
    }
}
