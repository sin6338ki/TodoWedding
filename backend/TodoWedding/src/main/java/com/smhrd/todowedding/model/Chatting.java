package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * 채팅 메시지 엔터티
 * 작성자 : 신지영
 * 작성일 : 2023.09.07
 */
@Getter
@Setter
@NoArgsConstructor
public class Chatting {

	private Long chattingSeq;
	private String type;
	private String chattingCreateDt;
	private String chattingSender;
	private String chattingContents;
	private Long chatRoomSeq;
	private char chattingSenderType;
	
	@Builder
	public Chatting(String chattingCreateDt, String chattingSender, String chattingContents, Long chatRoomSeq, char chattingSenderType) {
		this.chattingCreateDt = chattingCreateDt;
		this.chattingSender = chattingSender;
		this.chattingContents = chattingContents;
		this.chattingSenderType = chattingSenderType;
	}
}
