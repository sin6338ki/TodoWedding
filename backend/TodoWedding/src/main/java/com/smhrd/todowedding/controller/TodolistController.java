package com.smhrd.todowedding.controller;

import java.util.List;

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

import com.smhrd.todowedding.model.CountTodolist;
import com.smhrd.todowedding.model.IsCheckedTodolist;
import com.smhrd.todowedding.model.Todolist;
import com.smhrd.todowedding.model.TodolistDto;
import com.smhrd.todowedding.service.TodolistService;

import lombok.extern.slf4j.Slf4j;

/*
 * 투두리스트 관련 컨틀롤러
 *  - 등록, 해당 id에 대한 전체조회, 삭제, 수정
 *  - 총 개수 / 완료 건수 / 미완료 건수 불러오기
 *  작성자 : 신지영
 *  작성일 : 2023.09.05 
 */

@Slf4j
@CrossOrigin(origins = {"http://172.30.1.7:3000", "http://localhost:3000"})
@RestController
public class TodolistController {

	@Autowired
	private TodolistService todolistService;
	
	//해당 유저에 대하여 투두리스트 1개 추가하기
	@PostMapping(value="todolist")
	public int addTodoList(@RequestBody TodolistDto todoListDto) {
		//성공시 1 리턴, 실패시 0, 백엔드 에러 발생시 -1 리턴
		return todolistService.addTodoList(todoListDto);
	}
	
	//해당 유저에 대하여 투두리스트 전체 조회하기
	@GetMapping(value="todolist/{memberSeq}")
	public List<Todolist> findAllTodolist(@PathVariable(name="memberSeq") Long memberSeq){
		return todolistService.findAllTodolist(memberSeq);
	}
	
	//해당 유저의 선택된 투두리스트에 대하여 내용 수정하기
	@PutMapping(value="todolist/{todolistSeq}")
	public int updateTodolist(@PathVariable(name="todolistSeq") Long todolistSeq, @RequestBody TodolistDto todolistDto) {
		//성공시 1, 실패시 0, 백엔드 에러 발생시 -1 리턴
		return todolistService.updateTodolist(todolistSeq, todolistDto);
	}
	
	//해당 유저의 선택된 투두리스트 삭제하기
	@DeleteMapping(value="todolist/{todolistSeq}")
	public int deleteTodolist(@PathVariable(name="todolistSeq") Long todolistSeq) {
		log.info("path 경로 확인 : " + todolistSeq);
		//성공시 1, 실패하면 0, 백엔드 에러 발생시 -1 리턴
		return todolistService.deleteTodolist(todolistSeq);
	}
	
	//해당 유저의 총 투두리스트 개수, 완료 건수, 미완료 건수 불러오기
	@GetMapping(value="count-of-todolist/{memberSeq}")
	public List<JSONObject> allCountTodolist(@PathVariable(name="memberSeq") Long memberSeq){
		log.info("todolist 호출 : " + memberSeq);
		return todolistService.allCountTodolist(memberSeq);
	}
	
	//해당 유저의 해당 체크리스트에 대하여 완료 여부 변경
	@PutMapping(value="todolist/check")
	public int isCheckedTodolist(@RequestBody IsCheckedTodolist isCheckedTodolist) {
		//성공시 1, 실패시 0, 백엔드 에러 발생시 -1 리턴
		return todolistService.isCheckedTodolist(isCheckedTodolist);
	}
}
