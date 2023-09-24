package com.smhrd.todowedding.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.Chatroom;
import com.smhrd.todowedding.service.ChatService;

import lombok.extern.slf4j.Slf4j;

/*
 * 채팅 기능 관련 컨트롤러
 * - 채팅방 생성(완), 전체 채팅방 조회(완), 특정 채팅방 조회(완), 채팅방 삭제(완)
 * - 전체 채팅 내역 조회 (하나의 채팅방에 대한), 채팅 내용 저장(완 -> websocketController)
 * 작성자 : 신지영
 * 작성일 : 20203.09.05
 */

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://172.30.1.7:3000", "http://3.36.116.165:3000"})
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
	
	//특정 업체에 대한 전체 채팅방 조회
	@GetMapping(value="chat/{partnerSeq}")
	public List<JSONObject> findChatroom(@PathVariable(name="partnerSeq") Long partnerSeq){
		return chatService.findChatroom(partnerSeq);
	}
	
	//채팅방 삭제
	@DeleteMapping(value="chat/{chatRoomSeq}")
	public int deleteChatroom(@PathVariable(name="chatRoomSeq") Long chatRoomSeq) {
		//성공하면 1, 실패하면 0, 백엔드 에러 발생시 -1 리턴
		return chatService.deleteChatroom(chatRoomSeq);
	}
	
	//해당 채팅방에 대한 전체 메세지 조회
	@GetMapping(value="chat/message/{chatRoomSeq}")
	public List<JSONObject> findChatMessage(@PathVariable(name="chatRoomSeq") Long chatRoomSeq){
		return chatService.findChatMessage(chatRoomSeq);
	}
	
}
