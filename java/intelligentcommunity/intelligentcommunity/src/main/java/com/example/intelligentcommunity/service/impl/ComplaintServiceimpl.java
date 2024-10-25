package com.example.intelligentcommunity.service.impl;

import com.example.intelligentcommunity.dao.Complaint;
import com.example.intelligentcommunity.dao.Image;
import com.example.intelligentcommunity.dto.ComplaintDTO;
import com.example.intelligentcommunity.dto.ComplaintRequest;
import com.example.intelligentcommunity.mapper.ComplaintMapper;
import com.example.intelligentcommunity.service.ComplaintService;
import com.example.intelligentcommunity.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceimpl implements ComplaintService {

    @Autowired
    ComplaintMapper complaintMapper;
    @Autowired
    ImageService imageService;
    @Override
    public List<ComplaintDTO> findComplaintByuserId(Integer userId) {
        return complaintMapper.findComplaintByuserId(userId).stream().map(complaint -> {
            ComplaintDTO complaintDTO = new ComplaintDTO();
            complaintDTO.setComplaint(complaint);
            if(complaintDTO.getComplaint().getImageGroupId()!=null){
                complaintDTO.setImages(imageService.findImageByGroupId(complaintDTO.getComplaint().getImageGroupId()));
            }
            return complaintDTO;
        }).collect(Collectors.toList());

    }

    @Override
    @Transactional
    public void insertComplaint(ComplaintRequest complaintrequest) {

        complaintrequest.setImageGroupId(imageService.createImageGroupAndGetId());
        complaintMapper.insertComplaint(complaintrequest);
        if(complaintrequest.getImagePaths()!=null){
            for (String url : complaintrequest.getImagePaths()) {
                Image image = new Image();
                image.setImageUrl(url);
                image.setImageGroupId(complaintrequest.getImageGroupId());
                image.setDescription("投诉建议图片图片");
                imageService.insertImage(image);
            }

        }
    }

    @Override
    public void deleteComplaint(Integer Id) {
        complaintMapper.deleteComplaint(Id);
    }

    @Override
    public List<ComplaintDTO> findAllComplaints() {
        return complaintMapper.findAllComplaints().stream().map(complaint -> {
            ComplaintDTO complaintDTO = new ComplaintDTO();
            complaintDTO.setComplaint(complaint);
            if(complaintDTO.getComplaint().getImageGroupId()!=null){
                complaintDTO.setImages(imageService.findImageByGroupId(complaintDTO.getComplaint().getImageGroupId()));
            }
            return complaintDTO;
        }).toList();
    }

    @Override
    public void updateINPROGRESS(Integer Id) {
        complaintMapper.updateINPROGRESS(Id);
    }

    @Override
    public void updateCOMPLETED(Integer Id) {
        complaintMapper.updateCOMPLETED(Id);
    }

    @Override
    public void updateREJECTED(Integer Id) {
        complaintMapper.updateREJECTED(Id);
    }
}
