package com.smhrd.todowedding.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ChecklistMapper;

/*
 * 체크리스트 관련 서비스
 * - D-day 체크리스트 조회 
 * 		- 항목 조회
 * 		- 리스트 조회
 * - 항목별 체크리스트 조회
 * 		- 항목 조회
 * 		- 리스트 조회
 * 
 * 작성자 : 신지영
 * 작성일 : 2023.09.08
 */

@Service
public class ChecklistService {
	
	@Autowired
	private ChecklistMapper checklistMapper;
	
	//항목별 체크리스트 전체 조회 
	public List<JSONObject> findCheckItem(){
		List<JSONObject> resultCheckItem = null;
		try {
			resultCheckItem = checklistMapper.findCheckItem();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultCheckItem;
	}

	//각 항목에 대한 체크리스트 내용 조회
	public List<JSONObject> findCheckItemList(Long checkItemSeq){
		List<JSONObject> resultCheckItemList = null;
		try {
			resultCheckItemList = checklistMapper.findCheckItemList(checkItemSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultCheckItemList;
	}
	
	//D-day 체크리스트 항목 조회
	public List<JSONObject> findDayChecklist(){
		List<JSONObject> resultDayChecklist = null;
		try {
			resultDayChecklist = checklistMapper.findDayChecklist();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultDayChecklist;
	}
	
	//선택한 D-day에 대한
	public List<JSONObject> findDayChecklistContents(Long checkdaySeq){
		List<JSONObject> resultDayChecklist = null;
		try {
			resultDayChecklist = checklistMapper.findDayChecklistContents(checkdaySeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultDayChecklist;
	}
}
