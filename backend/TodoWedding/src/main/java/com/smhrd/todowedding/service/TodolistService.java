package com.smhrd.todowedding.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smhrd.todowedding.mapper.TodolistMapper;
import com.smhrd.todowedding.model.CountTodolist;
import com.smhrd.todowedding.model.IsCheckedTodolist;
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
	public int addTodoList(TodolistDto todolistDto){
		int resultAddTodo = -1;
		try {
			int result = todolistMapper.addTodoList(todolistDto);
			if(result > 0) {
				resultAddTodo = result;
			}else {			
				resultAddTodo = 0;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultAddTodo;
	}
	
	//memberSeq에 대한 todolist 전체 조회하기 
	public List<Todolist> findAllTodolist(Long memberSeq){
		List<Todolist> allTodolist = null;
		try {
			allTodolist = todolistMapper.findAllTodolist(memberSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allTodolist ;
	}
	
	//memberSeq, todolistSeq에 대한 todolist 내용 수정하기
	public int updateTodolist(Long todolistSeq, TodolistDto todolistDto) {
		int resultUpdate = -1;
		try {
			String todolistContents = todolistDto.getTodolistContents();
			Long memberSeq = todolistDto.getMemberSeq();
			resultUpdate = todolistMapper.updateTodolist(todolistSeq, todolistContents, memberSeq);
			if(resultUpdate < 1) resultUpdate = 0;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultUpdate;
	}
	
	//memberSeq, todolistSeq에 해당하는 투두리스트 삭제 
	public int deleteTodolist(Long todolistSeq) {
		int resultDelete = -1;
		try {
			log.info("todolist delete mapper 실행");
			resultDelete = todolistMapper.deleteTodolist(todolistSeq);
			if(resultDelete > 0) {
				log.info("todolist delete result : " + resultDelete );
			}else {
				resultDelete = 0;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultDelete;
	}
	
	//해당 유저의 투두리스트 총 개수, 완료 개수, 미완료 개수 불러오기
	public List<JSONObject> allCountTodolist(Long memberSeq){
		List<JSONObject> allCntTodoResult = null;
		try {
			todolistMapper.allCountTodolist(memberSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allCntTodoResult;
	}
	
	//해당 유저의 해당 투두리스트 완료 여부 변경
	public int isCheckedTodolist(IsCheckedTodolist isCheckedTodolist) {
		int isCkTodoResult = -1;
		try {
			isCkTodoResult = todolistMapper.isCheckedTodolist(isCheckedTodolist);
			if(isCkTodoResult < 1)	isCkTodoResult = 0 ;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return isCkTodoResult;
	}
}
