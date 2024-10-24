package com.example.intelligentcommunity.service;


import com.example.intelligentcommunity.dao.TestPo;
import jakarta.servlet.http.HttpServletResponse;

public interface TestService {

    String getImage(Integer id, HttpServletResponse response);

    public String addImage(TestPo testPo);
}
