package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ChatMapper;
import com.smhrd.todowedding.model.ChatEnterDto;
import com.smhrd.todowedding.model.Chatroom;

/*
 * 웹소켓, STOMP 채팅 관련 서비스
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
@Service
public class ChatService {

	@Autowired
	private ChatMapper chatMapper;
	
	//기업 고유번호와 회원고유번호로 조회하여 생성된 채팅방이 있는지 확인
	public Long isChatRoom(ChatEnterDto chatEnterDto) {
		
		Chatroom chatroom =  chatMapper.isChatRoom(chatEnterDto);
		
		//채팅방이 존재하면 채팅방 고유번호를, 존재하지 않으면 0 전송
		if(chatroom != null) {
			return chatroom.getChatRoomSeq();
		}else {
			return 0L;
		}
	}
}
