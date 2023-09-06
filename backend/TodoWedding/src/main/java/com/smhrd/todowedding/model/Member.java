package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Member {

	private Long memberSeq;
	private String nickname;
	private String email;
	private String gender;
	private String ageRange;
	private Long memberKakaoId;
	
	@Builder
	public Member(String nickname, String email, String gender, String ageRange, Long memberKakaoId ) {
		this.nickname = nickname;
		this.email = email;
		this.gender = gender;
		this.ageRange = ageRange;
		this.memberKakaoId = memberKakaoId;
	}
}
