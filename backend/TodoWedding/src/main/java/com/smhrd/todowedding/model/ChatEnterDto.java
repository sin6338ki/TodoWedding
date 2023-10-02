package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 채팅방 접속했을 때 DTO
 * @author 신지영
 * @since 2023.09.05
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class ChatEnterDto {

	private Long partnerSeq;
	private Long memberSeq;
	
}
