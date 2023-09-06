package com.smhrd.todowedding.controller;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.Schedule;
import com.smhrd.todowedding.service.ScheduleService;

import lombok.extern.slf4j.Slf4j;

/*
 * 일정 관련 컨트롤러
 * - 해당 유저의 해당 월에 대한 일정 조회 (완)
 * - 해당 유저의 전체 일정 조회 (완)
 * - 해당 유저의 특정 일정 조회 (완)
 * - 해당 유저 일정 추가 (완)
 * - 해당 유저의 특정 일정 수정 (완)
 * - 해당 유저의 특정 일정 삭제 (완)
 * - 해당 유저의 가장 오늘과 가까운 일정 조회 (완)
 * 
 * 성공시 1, 실패시 0, 서버 문제시 -1 return / 조회 결과 제외
 * 
 * 작성자 : 신지영
 * 작성일 : 2023.09.06
 */
@Slf4j
@CrossOrigin("http://localhost:3000")
@RestController
public class ScheduleController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	//해당 유저의 일정 추가 
	@PostMapping(value="schedule")
	public int addSchedule(@RequestBody Schedule shedule) {
		return scheduleService.addSchedule(shedule); 
	}
	
	//해당 유저의 특정 일정 수정
	@PutMapping(value="schedule/{scheduleSeq}")
	public int updateSchedule(@PathVariable(name="scheduleSeq") Long scheduleSeq, @RequestBody Schedule shedule) {
		return scheduleService.updateSchedule(scheduleSeq, shedule);
	}
	
	//해당 유저의 특정 일정 삭제 
	@DeleteMapping(value="schedule/{scheduleSeq}")
	public int deleteSchedule(@PathVariable(name="scheduleSeq") Long scheduleSeq) {
		return scheduleService.deleteSchedule(scheduleSeq);
	}
	
	//해당 유저의 특정 일정 조회
	@GetMapping(value="schedule/{scheduleSeq}")
	public JSONObject findScheduleBySeq(@PathVariable(name="scheduleSeq") Long scheduleSeq) {
		log.info("pathvariable 확인 : " + scheduleSeq);
		log.info("리턴값 확인 : " + scheduleService.findScheduleBySeq(scheduleSeq));
		return scheduleService.findScheduleBySeq(scheduleSeq);
	}
	
	//해당 유저의 전체 일정 조회
	@GetMapping(value="all-schedule/{memberSeq}")
	public List<JSONObject> findScheduleByMember(@PathVariable(name="memberSeq") Long memberSeq) {
		return scheduleService.findScheduleByMember(memberSeq);
	}
	
	//해당 유저의 특정 월에 대한 일정 조회
	@GetMapping(value="month-schedule/{memberSeq}/{month}")
	public List<JSONObject> findScheduleByMonth(@PathVariable(name="memberSeq") Long memberSeq, 
			@PathVariable(name="month") int month){
		return scheduleService.findScheduleByMonth(memberSeq, month);
	}
	
	//해당 유저의 오늘과 가장 가까운 일정 조회
	@GetMapping(value="latest-schedule/{memberSeq}")
	public JSONObject findLatestSchedule(@PathVariable(name="memberSeq") Long memberSeq) {
		return scheduleService.findLatestSchedule(memberSeq);
	}

}
