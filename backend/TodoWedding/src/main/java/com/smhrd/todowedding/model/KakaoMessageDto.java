package com.smhrd.todowedding.model;
/*
 * 카카오 메시지 API 연동, 카카오 메시지 보내기용 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class KakaoMessageDto {
	
		private String objType;
		private String text;
		private String webUrl;
		private String btnTitle;
	
}
