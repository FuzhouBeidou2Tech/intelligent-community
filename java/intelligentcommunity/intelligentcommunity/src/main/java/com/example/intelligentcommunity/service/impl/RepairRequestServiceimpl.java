package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.RepairRequest;
import com.example.intelligentcommunity.dto.RepairRequestDTO;
import com.example.intelligentcommunity.mapper.ImageMapper;
import com.example.intelligentcommunity.mapper.RepairRequestMapper;
import com.example.intelligentcommunity.service.RepairRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RepairRequestServiceimpl implements RepairRequestService {

    @Autowired
    private RepairRequestMapper repairRequestMapper;

    @Autowired
    private ImageMapper imageMapper;
    @Override
    public List<RepairRequestDTO> getRepairRequests(int userId) {


       List<RepairRequestDTO> repairRequestDTOList= repairRequestMapper.getRepairRequests(userId).stream().map(repairequest->{
           RepairRequestDTO RepairRequestDTO=new RepairRequestDTO();

           RepairRequestDTO.setRepairRequest(repairequest);

           RepairRequestDTO.setImages(imageMapper.findImageByGroupId(repairequest.getImageGroupId()));
           return RepairRequestDTO;
        }).collect(Collectors.toList());

       return repairRequestDTOList;
    }

    @Override
    public void addRepairRequest(RepairRequest repairRequest) {
        repairRequestMapper.addRepairRequest(repairRequest);
    }

    @Override
    public void deleterepairRequest(int Id) {
        repairRequestMapper.deleterepairRequest(Id);
    }
}
