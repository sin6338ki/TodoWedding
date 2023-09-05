package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.smhrd.todowedding.service.ChatService;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓, STOMP 채팅 기능 관련 컨트롤러
 * 작성자 : 신지영
 * 작성일 : 20203.09.05
 */

@Slf4j
@Controller
public class ChatController {

	@Autowired
	private ChatService chatService;
	
//	@MessageMapping("/chat/{chatRoomSeq}")
	
}
