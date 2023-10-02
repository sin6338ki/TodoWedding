package com.smhrd.todowedding.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.ChatMapper;
import com.smhrd.todowedding.model.Chatroom;
import com.smhrd.todowedding.model.Chatting;

import lombok.extern.slf4j.Slf4j;

/**
 * 웹소켓, STOMP 채팅 관련 서비스
 * @author 신지영
 * @since 2023.09.05
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
	
	//partnerSeq에대한 채팅방 목록 조회 
	public List<JSONObject> findChatroom(Long partnerSeq){
		List<JSONObject> resultChatRooms = null;
		try {
			resultChatRooms = chatMapper.findChatroom(partnerSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultChatRooms;
	}
	
	//특정 채팅방 삭제
	public int deleteChatroom(Long chatRoomSeq) {
		int deleteChatroomResult = -1;
		try {
			deleteChatroomResult = chatMapper.deleteChatroom(chatRoomSeq);
			if(deleteChatroomResult < 1) {
				deleteChatroomResult = 0;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return deleteChatroomResult;
	}
	
	//채팅 메세지 저장
	public int saveChatMessage(Long chatRoomSeq, Chatting chatting) {
		log.info("saveChatMessage 실행.......");
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
	
	//해당 채팅방 전체 메세지 조회
	public List<JSONObject> findChatMessage(Long chatRoomSeq){
		List<JSONObject> resultChatMessages = null;
		try {
			resultChatMessages = chatMapper.findChatMessage(chatRoomSeq);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return resultChatMessages;
	}
}
