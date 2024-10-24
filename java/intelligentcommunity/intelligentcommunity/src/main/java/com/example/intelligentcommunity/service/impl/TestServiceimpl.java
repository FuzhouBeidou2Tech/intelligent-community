package com.example.intelligentcommunity.service.impl;


import com.example.intelligentcommunity.mapper.TestMapper;
import com.example.intelligentcommunity.service.TestService;
import com.example.intelligentcommunity.dao.TestPo;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;


@Service
public class TestServiceimpl implements TestService {
    @Autowired
    private TestMapper testMapper;

    @Override
    public String addImage(TestPo testPo) {
        testMapper.insertImage(testPo);
        return "ok";
    }

    @Override
    public String getImage(Integer id, HttpServletResponse response) {
        try {
            TestPo testPo = testMapper.selectImageById(id);
            byte[] image = (byte[]) testPo.getImage();
            String value = new String(image, "UTF-8");

            // 使用 Base64 类进行解码
            byte[] bytes = Base64.getDecoder().decode(value);

            response.setContentType("image/jpeg");
            ServletOutputStream out = response.getOutputStream();
            out.write(bytes);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "ok";
    }
}
