package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 채팅 입장 메시지 엔터티
 * @author 신지영
 * @since 2023.09.22
 */

@Getter
@Setter
@NoArgsConstructor
public class GreetingMessage {
	private String type;
	private String chattingContents;
}
