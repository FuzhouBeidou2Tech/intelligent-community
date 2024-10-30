package com.example.intelligentcommunity.controller;


import com.example.intelligentcommunity.dao.TestPo;
import com.example.intelligentcommunity.service.TestService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;

@RestController
@RequestMapping("/url")
@Validated
public class TestController {
    @Autowired
    private TestService testService;

    @PostMapping("/add/image")
    public String addImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Integer id) throws Exception{
        if(!file.isEmpty()){
            String image = Base64.getEncoder().encodeToString(file.getBytes());
            TestPo testPo = new TestPo();
            testPo.setId(id);
            testPo.setImage(image);
            testService.addImage(testPo);
        }
        return "ok";
    }

    @GetMapping("/get/image")
    public void getImage(@RequestParam("id") Integer id, HttpServletResponse response) throws Exception{
        testService.getImage(id,response);
    }
}
