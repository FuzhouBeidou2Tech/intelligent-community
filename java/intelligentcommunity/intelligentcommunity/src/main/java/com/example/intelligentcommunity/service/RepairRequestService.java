package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.RepairRequest;
import com.example.intelligentcommunity.dto.RepairRequestDTO;
import com.example.intelligentcommunity.mapper.RepairRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RepairRequestService {

    List<RepairRequestDTO> getRepairRequests(int userId);

    void addRepairRequest(RepairRequest repairRequest);

    void deleterepairRequest(int Id);
//获取全局维修表
    List<RepairRequestDTO> getRepairRequestsall();

    void updateRepairsINPROGRESS(Integer Id);

    void updateRepairsCOMPLETED(Integer Id);

    void updateRepairsREJECTED(Integer Id);
}
