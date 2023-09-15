package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.smhrd.todowedding.model.Schedule;


/*
 * 스케쥴 관련 mapper
 * 작성자 : 신지영
 * 작성일 : 2023.09.06
 */

@Mapper
public interface ScheduleMapper {
	
	//스케쥴 추가
	@Insert("insert into tw_schedule (schedule_start_dt, schedule_end_dt, schedule_contents, member_seq) values (#{scheduleStartDt}, #{scheduleEndDt}, #{scheduleContents}, #{memberSeq});")
	public int addSchedule(Schedule shedule);
	
	//특정 스케쥴 수정
	@Update("update tw_schedule set schedule_start_dt = #{scheduleStartDt}, schedule_end_dt = #{scheduleEndDt}, schedule_contents = #{scheduleContents} where schedule_seq=#{scheduleSeq}")
	public int updateSchedule(String scheduleStartDt, String scheduleEndDt, String scheduleContents, Long scheduleSeq);

	//특정 스케쥴 삭제 
	@Delete("delete from tw_schedule where schedule_seq=#{scheduleSeq}")
	public int deleteSchedule(Long scheduleSeq);
	
	//특정 스케쥴 조회
	@Select("select * from tw_schedule where schedule_seq=#{scheduleSeq}")
	public JSONObject findScheduleBySeq(Long scheduleSeq);
	
	//특정 유저의 전체 스케쥴 조회
	@Select("select * from tw_schedule where member_seq=#{memberSeq}")
	public List<JSONObject> findScheduleByMember(Long memberSeq);
	
	//특정 유저의 해당 월에 대한 스케쥴 조회
	@Select("select * from tw_schedule where (DATE_FORMAT(STR_TO_DATE(schedule_start_dt, '%Y-%m-%d'), '%m')=#{month} or DATE_FORMAT(STR_TO_DATE(schedule_end_dt, '%Y-%m-%d'), '%m')=#{month}) and member_seq=#{memberSeq}")
	public List<JSONObject> findScheduleByMonth(Long memberSeq, int month);
	
	//특정 유저의 가장 최근 스케쥴 조회 
	@Select("select * from tw_schedule where (DATE_FORMAT(STR_TO_DATE(schedule_end_dt, '%Y-%m-%d'), '%Y-%m-%d') >= DATE(sysdate()) and member_seq=#{memberSeq}) order by schedule_start_dt limit 1")
	public JSONObject findLatestSchedule(Long memberSeq);
	
}
