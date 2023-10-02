package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 카카오 메시지 API 연동, 카카오 메시지 보내기용 DTO
 * @author 신지영
 * @since 2023.09.12
 */

@NoArgsConstructor
@Getter
@Setter
public class KakaoMessageDto {
	
		private String objType;
		private String text;
		private String webUrl;
		private String btnTitle;
	
}
