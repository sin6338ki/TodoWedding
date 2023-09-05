package com.smhrd.todowedding.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smhrd.todowedding.mapper.TodolistMapper;
import com.smhrd.todowedding.model.CountTodolist;
import com.smhrd.todowedding.model.Todolist;
import com.smhrd.todowedding.model.TodolistDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 투두리스트 관련 서비스
 *  - 등록, 해당 id에 대한 전체조회, 삭제, 수정
 *  - 완료로 수정하기
 *  - 총 개수 / 완료 건수 / 미완료 건수 불러오기
 *  작성자 : 신지영
 *  작성일 : 2023.09.05 
 */
@Slf4j
@Service
public class TodolistService {

	@Autowired
	private TodolistMapper todolistMapper;
	
	//memberSeq에 대한 todolist 등록하기
	public int addTodoList(TodolistDto todolistDto) {
		//성공시 1 return
		return todolistMapper.addTodoList(todolistDto);
	}
	
	//memberSeq에 대한 todolist 전체 조회하기 
	public List<Todolist> findAllTodolist(int memberSeq){
		return todolistMapper.findAllTodolist(memberSeq);
	}
	
	//memberSeq, todolistSeq에 대한 todolist 내용 수정하기
	public int updateTodolist(int todolistSeq, TodolistDto todolistDto) {
		String todolistContents = todolistDto.getTodolistContents();
		int memberSeq = todolistDto.getMemberSeq();
		return todolistMapper.updateTodolist(todolistSeq, todolistContents, memberSeq);
	}
	
	//memberSeq, todolistSeq에 해당하는 투두리스트 삭제 
	public String deleteTodolist(int memberSeq, int todolistSeq) {
		todolistMapper.deleteTodolist(memberSeq, todolistSeq);
		log.info("success delete todolist : memberSeq - " + memberSeq + " todolistSeq - " + todolistSeq);
		return "success";
	}
	
	//해당 유저의 투두리스트 총 개수, 완료 개수, 미완료 개수 불러오기
	public List<CountTodolist> allCountTodolist(int memberSeq){
		return todolistMapper.allCountTodolist(memberSeq);
	}
}
