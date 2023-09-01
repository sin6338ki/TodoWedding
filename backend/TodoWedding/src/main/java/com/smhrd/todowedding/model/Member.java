package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Member {

	private int memberSeq;
	private String nickname;
	private String email;
	private String gender;
	private String ageRange;
	private String createAt;
	private String memberKakaoId;
	
}
