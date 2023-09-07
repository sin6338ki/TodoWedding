package com.smhrd.todowedding.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.Chatroom;
import com.smhrd.todowedding.service.ChatService;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓, STOMP 채팅 기능 관련 컨트롤러
 * 작성자 : 신지영
 * 작성일 : 20203.09.05
 */

@Slf4j
@RestController
@CrossOrigin("http://localhost:3000")
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	//채팅방 조회하기
	@GetMapping(value="chat/{memberSeq}/{partnerSeq}")
	public String isChatRoom(@PathVariable(name="memberSeq") Long memberSeq,
			@PathVariable(name="partnerSeq") Long partnerSeq) {	
		//채팅방이 존재하면 채팅방 고유번호를, 존재하지 않으면 none, 백엔드 에러 발생시 BE error 전송
		log.info("request data 확인 : memberSeq - " + memberSeq + ", type - " + memberSeq.TYPE + ", partnerSeq - " + partnerSeq);
		return chatService.isChatRoom(memberSeq, partnerSeq);
	}
	
	//채팅방 만들기
	@PostMapping(value="chat")
	public int createChat(@RequestBody Chatroom chatroom) {
		log.info("createChat 컨트롤러 실행...... : " + chatroom.getMemberSeq());
		//성공하면 1, 실패하면 0 return
		return chatService.createChat(chatroom);
	}
	
}
