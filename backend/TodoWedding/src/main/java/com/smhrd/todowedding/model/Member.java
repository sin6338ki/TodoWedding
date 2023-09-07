package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


/*
 * 카카오에 로그인한 사용자 정보 저장
 * 작성 : 지영이누나가 다함
 * 일자 : 2023.09.06
 */

@NoArgsConstructor
@Getter
@ToString
public class Member {

	private Long memberSeq;
	private String nickname;
	private String email;
	private String gender;
	private String ageRange;
	private Long memberKakaoId;
	
	// Kakao 사용자 정보
	@Builder
	public Member(String nickname, String email, String gender, String ageRange, Long memberKakaoId ) {
		this.nickname = nickname;
		this.email = email;
		this.gender = gender;
		this.ageRange = ageRange;
		this.memberKakaoId = memberKakaoId;
		
	}
	
	
}
