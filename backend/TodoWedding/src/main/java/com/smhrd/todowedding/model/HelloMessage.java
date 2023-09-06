package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class HelloMessage {
	private String chattingCreateDt;
	private String chattingSender;
	private String chattingContents;
	private Long chatRoomSeq;
	private char chattingSenderType;
}
