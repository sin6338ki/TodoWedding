package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 채팅 메시지 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
@AllArgsConstructor
@Getter
public class ChatMessageDto {
	
	private Long chattingSeq;
	private String chattingCreateDt;
	private Long chattingSender;
	private String chattingContents;
	private Long chatRoomSeq;
	private char chattingSenderType;
	
}
