package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * Member 정보 조회 ResponseDTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

@AllArgsConstructor
@Getter
public class MemberResponseDto {
	private Long member_seq;
	private String nickname;
	private String e_mail;
	private String gender;
	private String age_range;
}
