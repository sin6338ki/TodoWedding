package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.ChatEnterDto;
import com.smhrd.todowedding.model.Chatroom;

@Mapper
public interface ChatMapper {

	//기업 고유번호, 회원 고유번호로 채팅방 유무 확인
	@Select("select * from tw_chatroom where partner_seq=#{partnerSeq} and member_seq=#{memberSeq}")
	public Chatroom isChatRoom(ChatEnterDto chatEnterDto);
	
	@Insert("insert into tw_chatroom (member_seq, chat_room_create_dt, partner_seq) values (#{memberSeq}, #{chatRoomCreateDt}, #{partnerSeq})")
	public int createChat(Chatroom chatroom);
}