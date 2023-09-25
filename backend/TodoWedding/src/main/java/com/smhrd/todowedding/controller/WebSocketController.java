package com.smhrd.todowedding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.smhrd.todowedding.model.Chatting;
import com.smhrd.todowedding.model.GreetingMessage;
import com.smhrd.todowedding.service.ChatService;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓 메시지 핸들링 컨트롤러
 * 작성자 : 신지영
 * 작성일 : 2023.09.07
 * 수정 
 * 	- 입장, 퇴장 메시지 기능 추가 (2023.09.22 신지영)
 */

@Slf4j
@Controller
public class WebSocketController {

	@Autowired
	private ChatService chatService;
	
	//@SendTo 어노테이션에 동적 경로를 사용하려면 SimpMessagingTemplate를 사용해야 합니다. 이 클래스는 메시지를 특정 대상에게 전송하는 기능을 제공
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	//채팅 메시지 전달
	@MessageMapping(value="chat/{chatRoomSeq}")
	public void broadCasting(@Payload Chatting chatting, 
			@DestinationVariable(value="chatRoomSeq") Long chatRoomSeq) {
			log.info("웹소켓 메시지 : "+ chatting.getChattingContents() + chatRoomSeq);
			chatService.saveChatMessage(chatRoomSeq, chatting);
			messagingTemplate.convertAndSend("/sub/chat/" + chatRoomSeq, chatting);
	}
	
	//입장 메시지 전달
	@MessageMapping(value="enter/{chatRoomSeq}")
	public void enter(@Payload GreetingMessage chatting, 
			@DestinationVariable(value="chatRoomSeq") Long chatRoomSeq) {
			log.info("웹소켓 메시지 : "+ chatting.getChattingContents() + chatRoomSeq);
			messagingTemplate.convertAndSend("/sub/chat/" + chatRoomSeq, chatting);
	}
}
