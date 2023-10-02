package com.smhrd.todowedding.model;

import lombok.Data;
import lombok.Getter;

/**
 * 웹소켓 메시지 DTO
 * @author 신지영
 * @since 2023.09.05
 */

@Data
@Getter
public class Message {
	private Long memberSeq;
	private String contents;
	private Long chatRoomSeq;
}
