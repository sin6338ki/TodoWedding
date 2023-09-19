package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 지출,수입 각각 식별값,비용,날짜,내용 관련 DTO
 * 작성자 : 서유광
 * 작성일 : 2023.09.18
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
public class BudgetListDto {
	private long income_seq; // 수입고유 번호
	private String income_cost; // 수입액
	private String income_dt; // 수입일
	private String income_contents; // 수입 내용
	private long budget_seq; // 지출 고유번호
	private String budget_cost; // 지출액
	private String budget_expense_dt; // 지출일
	private String budget_memo; // 지출내용
	private long member_seq; // 사용자 식별값
}
