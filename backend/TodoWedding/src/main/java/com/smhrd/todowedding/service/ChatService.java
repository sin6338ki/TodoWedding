package com.smhrd.todowedding.service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ChatMapper;
import com.smhrd.todowedding.model.ChatEnterDto;
import com.smhrd.todowedding.model.Chatroom;

import lombok.extern.slf4j.Slf4j;

/*
 * 웹소켓, STOMP 채팅 관련 서비스
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
@Slf4j
@Service
public class ChatService {

	@Autowired
	private ChatMapper chatMapper;
	
	//기업 고유번호와 회원고유번호로 조회하여 생성된 채팅방이 있는지 확인
	public String isChatRoom(Long memberSeq, Long partnerSeq) {
		String chatRoomSeq = "BE Error";
		try {
			Chatroom chatroom = Chatroom.builder().memberSeq(memberSeq).partnerSeq(partnerSeq).build();
//			log.info("chatroom 생성 확인(memberSeq) : " + chatroom.getMemberSeq());
			
			JSONObject resultChatroom = chatMapper.isChatRoom(chatroom);
			
			//채팅방이 존재하면 채팅방 고유번호를, 존재하지 않으면 0 전송
			if(resultChatroom == null) {
				 chatRoomSeq = "none";
			}else {
				chatRoomSeq = resultChatroom.get("chat_room_seq").toString();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return chatRoomSeq;
	}
	
	//채팅방 만들기 
	public int createChat(Chatroom chatroom) {
		int createChatResult = -1;
		try {
			createChatResult = chatMapper.createChat(chatroom);
			log.info("createChatResult : " + createChatResult);
			
			if(createChatResult > 0) {
				log.info("createChatResult : " + createChatResult);
			}else {
				createChatResult = 0;
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return createChatResult;
	}
}
