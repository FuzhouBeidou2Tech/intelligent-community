package com.example.intelligentcommunity.service;

import com.example.intelligentcommunity.dao.Complaint;
import com.example.intelligentcommunity.dto.ComplaintDTO;
import com.example.intelligentcommunity.dto.ComplaintRequest;

import java.util.List;

public interface ComplaintService {

    List<ComplaintDTO> findComplaintByuserId(Integer userId);

    void insertComplaint(ComplaintRequest complaintrequest);

    void deleteComplaint(Integer Id);
}
