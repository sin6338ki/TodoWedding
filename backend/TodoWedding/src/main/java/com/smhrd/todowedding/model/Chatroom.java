package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 채팅방 entity
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */

@AllArgsConstructor
@Getter
public class Chatroom {

	private Long chatRoomSeq;
	private Long memberSeq;
	private String chatRoomCreateDt;
	private Long partnerSeq;
}
