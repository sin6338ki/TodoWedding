package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 지출 관련 DTO
 * @author 서유광
 * @since 2023.09.11
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
public class BudgetDto {
	private long budget_seq; // 지출 고유번호
	private String budget_item; // 지출 항목
	private String budget_expense_dt; // 지출일
	private String budget_cost; // 예상비용
	private String budget_role; // 분담
	private String budget_memo; // 메모
	private String budget_expense_cost; // 지출액
	private long member_seq; // 회원 고유번호

	@Builder
	public BudgetDto(long member_seq) {
		this.member_seq = member_seq;
	}

}
