package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.smhrd.todowedding.model.Chatting;
import com.smhrd.todowedding.service.WebSocketService;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓 메시지 핸들링 컨트롤러
 * 작성자 : 신지영
 * 작성일 : 2023.09.07
 */

@Slf4j
@Controller
public class WebSocketController {

	@Autowired
	private WebSocketService wsService;
	
	//채팅 메세지 전달
	@MessageMapping(value="chat/{chatRoomSeq}")
	@SendTo(value="sub/chat/{chatRoomSeq}")
	public int broadCasting(Chatting chatting, 
			@DestinationVariable(value="chatRoomSeq") Long chatRoomSeq) {
		log.info("웹소켓 메시지 : "+ chatting.getChattingContents() + chatRoomSeq);
		return wsService.recordHistory(chatRoomSeq, chatting);
	}
	
}
