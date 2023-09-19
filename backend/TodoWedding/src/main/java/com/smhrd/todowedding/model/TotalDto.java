package com.smhrd.todowedding.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 금액 총합, 예상 비용 관련 dto
 *  - tw_budget 테이블에 budget_cost(예상 지출액) 총합 , budget_expense_cost(지출액) 총합
 *  - tw_income 테이블에 income_cost(수입액)
 *  - tw_marrydate 테이블에 total_budget(결혼 예상금액)
 *  작성자 : 서유광
 *  작성일 : 2023.09.13
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
public class TotalDto {
	
	private long budget_sum_cost; // 예상 지출액 총합
	private long budget_total_expense_cost; // 지출액 총합
	private long income_total_cost; // 수입액 총합
	private long member_seq; // 사용자 식별값
	private long total_budget; // 총 예상 비용
}
