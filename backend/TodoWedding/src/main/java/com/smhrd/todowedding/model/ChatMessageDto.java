package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 채팅 메시지 DTO
 * @author 신지영
 * @since 2023.09.05
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class ChatMessageDto {
	
	private Long chattingSeq;
	private String chattingCreateDt;
	private Long chattingSender;
	private String chattingContents;
	private Long chatRoomSeq;
	private char chattingSenderType;
	
}
