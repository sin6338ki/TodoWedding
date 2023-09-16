package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
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
	
	//partnerSeq 에 대한 채팅방 목록 조회
	@Select("SELECT tc.chat_room_seq, tc.member_seq, tc.partner_seq, tm.nickname,   tc2.chatting_create_dt FROM (SELECT chat_room_seq, member_seq, partner_seq FROM tw_chatroom WHERE partner_seq=124) AS tc INNER JOIN tw_member tm ON tc.member_seq = tm.member_seq INNER JOIN tw_chatting tc2 ON tc.chat_room_seq = tc2.chat_room_seq ORDER BY tc2.chatting_create_dt DESC LIMIT 1")
	public List<JSONObject> findChatroom(Long partnerSeq);
	
	//chatRoomSeq 채팅방 삭제 
	@Delete("delete from tw_chatroom where chat_room_seq=#{chatRoomSeq}")
	public int deleteChatroom(Long chatRoomSeq);
	
	//chatRoomSeq에 따른 전체 메세지 조회 
	@Select("select * from tw_chatting where chat_room_seq=#{chatRoomSeq}")
	public List<JSONObject> findChatMessage(Long chatRoomSeq);
	
}