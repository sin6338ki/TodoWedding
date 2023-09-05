package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.ChatEnterDto;
import com.smhrd.todowedding.service.ChatService;

import jakarta.servlet.http.HttpServletResponse;
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
	
	@PostMapping(value="enter-chat")
	public Long enter(@RequestBody ChatEnterDto chatEnterDto) {

		log.info("enter-chat dto 확인 : " + chatEnterDto.getMemberSeq() + " , " + chatEnterDto.getPartnerSeq());
		
		//채팅방이 존재하면 채팅방 고유번호를, 존재하지 않으면 0 전송
		return chatService.isChatRoom(chatEnterDto);
	}
	
	
}
