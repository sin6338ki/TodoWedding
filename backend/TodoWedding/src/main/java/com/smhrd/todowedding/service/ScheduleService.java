package com.smhrd.todowedding.service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ScheduleMapper;
import com.smhrd.todowedding.model.Schedule;

import lombok.extern.slf4j.Slf4j;

/*
 * 스케쥴 관련 서비스
 * 작성자 : 신지영
 * 작성일 : 2023.09.06
 */
@Slf4j
@Service
public class ScheduleService {

	@Autowired
	private ScheduleMapper scheduleMapper;
	
	//스케쥴 추가
	public int addSchedule(Schedule shedule) {
		int scheduleResult = -1;
		try {
			if(scheduleMapper.addSchedule(shedule) > 0) {
				scheduleResult = 1;
			}else scheduleResult = 0;
			
		}catch (Exception e){
			e.printStackTrace();
		}
		return scheduleResult;
	}
	
	//특정 scheduleSeq의 스케쥴 수정
	public int updateSchedule(Long scheduleSeq, Schedule shedule) {
		String scheduleStartDt = shedule.getScheduleStartDt();
		String scheduleEndDt = shedule.getScheduleEndDt();
		String scheduleContents = shedule.getScheduleContents();
		
		int updateScheduleResult = -1;
		try {
			if(scheduleMapper.updateSchedule(scheduleStartDt, scheduleEndDt, scheduleContents, scheduleSeq) > 0) {
				updateScheduleResult = 1;
			}else {
				updateScheduleResult = 0;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return updateScheduleResult;
	}
	
	//특정 scheduleSeq 삭제 
	public int deleteSchedule(Long scheduleSeq) {
		int deleteScheduleResult = -1;
		try {
			if(scheduleMapper.deleteSchedule(scheduleSeq) > 0) {
				deleteScheduleResult = 1;
			}else {
				deleteScheduleResult = 0;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return deleteScheduleResult;
	}
	
	//특정 scheduleSeq 조회
	public JSONObject findScheduleBySeq(Long scheduleSeq) {
		JSONObject schedule = null;
		try {
			schedule = scheduleMapper.findScheduleBySeq(scheduleSeq);
			log.info("mapper 결과 : " + schedule.toString());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return schedule;
	}
	
	//특정 memberSeq 전체 일정 조회
	public List<JSONObject> findScheduleByMember(Long memberSeq) {
		List<JSONObject> allSchedule = null;
		try {
			allSchedule = scheduleMapper.findScheduleByMember(memberSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allSchedule;
	}
	
	//특정 memberSeq의 특정 월에 대한 일정 조회
	public List<JSONObject> findScheduleByMonth(Long memberSeq, int month){
		List<JSONObject> monthSchedule = null;
		try {
			monthSchedule = scheduleMapper.findScheduleByMonth(memberSeq, month);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return monthSchedule;
	}
	
	//특정 memberSeq의 가장 최근 일정 조회 
	public JSONObject findLatestSchedule(Long memberSeq) {
		JSONObject latestSchedule = null;
		try {
			latestSchedule = scheduleMapper.findLatestSchedule(memberSeq);
			log.info("mapper 결과 : " + latestSchedule.toString());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return latestSchedule;
	}
	
}
