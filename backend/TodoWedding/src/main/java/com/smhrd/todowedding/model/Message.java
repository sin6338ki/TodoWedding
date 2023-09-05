package com.smhrd.todowedding.model;

import lombok.Data;
import lombok.Getter;

/*
 * 웹소켓 메시지 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */

@Data
@Getter
public class Message {
	private Long memberSeq;
	private String contents;
	private Long chatRoomSeq;
}
