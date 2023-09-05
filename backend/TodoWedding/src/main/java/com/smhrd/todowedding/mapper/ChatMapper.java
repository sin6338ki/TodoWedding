package com.smhrd.todowedding.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.ChatEnterDto;
import com.smhrd.todowedding.model.Chatroom;

@Mapper
public interface ChatMapper {

	@Select("select * from tw_chatroom where partner_seq=#{partnerSeq} and member_seq=#{memberSeq}")
	public Chatroom isChatRoom(ChatEnterDto chatEnterDto);
}
