package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 웹소켓 채팅 메시지 response dto
 * @author 신지영
 * @since 2023.09.08
 */

@Getter
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
