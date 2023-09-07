package com.smhrd.todowedding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ChatMapper;
import com.smhrd.todowedding.model.Chatting;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓 관련 서비스 
 * 작성자 : 신지영
 * 작성일 : 2023.09.07
 */
@Slf4j
@Service
public class WebSocketService {
	
	@Autowired
	private ChatMapper chatMapper;

	//채팅 메세지 저장
	public int recordHistory(Long chatRoomSeq, Chatting chatting) {
		int saveChatMessageResult = -1;
		try {
			//DB에 채팅 메시지 내용 저장
			chatting.setChatRoomSeq(chatRoomSeq);
			saveChatMessageResult = chatMapper.saveChatMessage(chatting);
			
			if(saveChatMessageResult < 1) {
				saveChatMessageResult = 0;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return saveChatMessageResult;
	}
}
