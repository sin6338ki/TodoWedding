package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.json.simple.JSONObject;

/**
 * 체크리스트 관련 mapper
 * - D-day 체크리스트 조회 
 * 		- 항목 조회
 * 		- 리스트 조회
 * - 항목별 체크리스트 조회
 * 		- 항목 조회
 * 		- 리스트 조회
 * 
 * @author 신지영
 * @since 2023.09.08
 */

@Mapper
public interface ChecklistMapper {
	
	//전체 항목별 체크리스트 카테고리 불러오기 
	@Select("select * from tw_checkitem")
	public List<JSONObject> findCheckItem();

	//해당 항목에 대한 체크리슽 내용 불러오기
	@Select("select check_list_seq, checkitem_list_contents from tw_checkitem_list where checkitem_list_seq=#{checkItemSeq}")
	public List<JSONObject> findCheckItemList(Long checkItemSeq);
	
	//D-day 체크리스트 항목 불러오기 
	@Select("select * from tw_checkday")
	public List<JSONObject> findDayChecklist();
	
	//D-day에 대한 체크리스트 리스트 불러오기 
	@Select("select checkday_list_contents, checkday_list_seq from tw_checkday_list where checkday_seq=#{checkdaySeq}")
	public List<JSONObject> findDayChecklistContents(Long checkdaySeq);
	
	//D-day에 대한 체크리스트 내용만 불러오기
	@Select("select checkday_list_contents from tw_checkday_list where checkday_seq=#{checkdaySeq}")
	public List<String> findDayChecklistContentsOnly(Long checkdaySeq);
	
}
