package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.json.simple.JSONObject;

import com.smhrd.todowedding.model.IsCheckedTodolist;
import com.smhrd.todowedding.model.Todolist;
import com.smhrd.todowedding.model.TodolistDto;

/**
 * 투두리스트 관련 mapper
 * @author 신지영
 * @sisnce 2023.09.05
 */

@Mapper
public interface TodolistMapper {

	//해당 user의 투두리스트에 투두리스트 추가하기
	@Insert("insert into tw_todolist (todolist_contents, member_seq) values (#{todolistContents}, #{memberSeq})")
	public int addTodoList(TodolistDto todolistDto);
	
	//해당 user의 전체 투두리스트 조회하기
	@Select("select * from tw_todolist where member_seq=#{memberSeq} order by todolist_seq desc")
	public List<JSONObject> findAllTodolist(Long memberSeq);
	
	//memberSeq, todolistSeq에 대하여 내용 수정하기 
	@Update("update tw_todolist set todolist_contents =#{todolistContents} where todolist_seq=#{todolistSeq} and member_seq=#{memberSeq}")
	public int updateTodolist(Long todolistSeq, String todolistContents, Long memberSeq);
	
	//memberSeq, todolistSeq에 대한 투두리스트 삭제하기 
	@Delete("delete from tw_todolist where todolist_seq=#{todolistSeq}")
	public int deleteTodolist(Long todolistSeq);
	
	//memberSeq의 전체 투두리스트 개수 조회
	@Select("select todolist_completed, count(todolist_completed) as count from tw_todolist where member_seq=#{memberSeq} group by todolist_completed")
	public List<JSONObject> allCountTodolist(Long memberSeq);
	
	//memberSeq, todolistSeq에 대하여 완료여부 수정
	@Update("update tw_todolist set todolist_completed =#{todolistCompleted} where todolist_seq=#{todolistSeq} and member_seq=#{memberSeq}")
	public int isCheckedTodolist(IsCheckedTodolist isCheckdTodolist);
}
