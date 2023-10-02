package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 수입 관련 DTO
 * @author 서유광
 * @since 2023.09.11
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
public class IncomeDto {
	private long income_seq; // 수입 고유번호
	private String income_dt; // 수입일
	private String income_cost; // 수입액
	private String income_contents; // 수입 내역
	private String member_seq; // 회원 고유번호
}
