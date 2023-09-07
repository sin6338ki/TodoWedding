package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.json.simple.JSONObject;

import com.smhrd.todowedding.model.Chatroom;
import com.smhrd.todowedding.model.Chatting;

/*
 * 채팅 관련 Mapper
 * 작성자 : 신지영
 * 작성일 : 2023.09.07
 */

@Mapper
public interface ChatMapper {

	//기업 고유번호, 회원 고유번호로 채팅방 유무 확인
	@Select("select * from tw_chatroom where partner_seq=#{partnerSeq} and member_seq=#{memberSeq}")
	public JSONObject isChatRoom(Chatroom chatroom);

	//채팅방 생성
	@Insert("insert into tw_chatroom (member_seq, chat_room_create_dt, partner_seq) values (#{memberSeq}, #{chatRoomCreateDt}, #{partnerSeq})")
	public int createChat(Chatroom chatroom);

	//채팅 메세지 저장
	@Insert("insert into tw_chatting (chatting_create_dt, chatting_sender, chatting_contents, chat_room_seq, chatting_sender_type) values (#{chattingCreateDt}, #{chattingSender}, #{chattingContents}, #{chatRoomSeq}, #{chattingSenderType})")
	public int saveChatMessage(Chatting chatting);
}