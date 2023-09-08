package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/*
 * 웹소켓 채팅 메시지 response dto
 * 작성자 : 신지영
 * 작성일 : 2023.09.08
 */
@NoArgsConstructor
public class ChattingResponseDto {

	private String chattingContents;
	private String chattingCreateDt;
	private char chattingSenderType;
	
	@Builder
	public ChattingResponseDto(String chattingContents, String chattingCreateDt, char chattingSenderType) {
		this.chattingContents = chattingContents;
		this.chattingCreateDt = chattingCreateDt;
		this.chattingSenderType = chattingSenderType;
	}
}
