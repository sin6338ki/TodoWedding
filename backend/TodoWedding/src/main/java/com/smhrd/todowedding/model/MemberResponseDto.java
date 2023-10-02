package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Member 정보 조회 ResponseDTO
 * @author 신지영
 * @since 2023.09.10
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MemberResponseDto {
	private Long member_seq;
	private String nickname;
	private String e_mail;
	private String gender;
	private String age_range;
}
