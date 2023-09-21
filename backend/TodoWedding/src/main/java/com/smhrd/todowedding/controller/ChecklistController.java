package com.smhrd.todowedding.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.service.ChecklistService;

import lombok.extern.slf4j.Slf4j;

/*
 * 체크리스트 관련 컨트롤러
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
@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://172.30.1.7:3000"})
public class ChecklistController {
	
	@Autowired
	private ChecklistService checklistService;
	
	//항목별 체크리스트
	//1. 항목별 체크리스트 전체 항목 조회 
	@GetMapping(value="checkitem")
	public List<JSONObject> findCheckItem(){
		log.info("checkitem 조회 확인");
		return checklistService.findCheckItem();
	}
	
	//2. 각 항목에 대한 체크리스트 조회 
	@GetMapping(value="checkitem/{checkItemSeq}")
	public List<JSONObject> findCheckItemList(@PathVariable(name="checkItemSeq") Long checkItemSeq){
		return checklistService.findCheckItemList(checkItemSeq);
	}
	
	//D-day별 체크리스트
	//1. D-day 체크리스트 전체 항목 조회 
	@GetMapping(value="daychecklist")
	public List<JSONObject> findDayChecklist(){
		return checklistService.findDayChecklist();
	}
	
	//2. 선택한 D-day에 대한 체크리스트 내용 조회
	@GetMapping(value="daychecklist/{checkdaySeq}")
	public List<JSONObject> findDayChecklistContents(@PathVariable(name="checkdaySeq") Long checkdaySeq){
		return checklistService.findDayChecklistContents(checkdaySeq);
	}
	

}
