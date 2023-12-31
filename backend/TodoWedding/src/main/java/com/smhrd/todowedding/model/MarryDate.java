package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 결혼식 D-day Entity
 * @author 신지영
 * @since 2023.09.04
 * 수정
 * 	- 총 예산 컬럼 추가 반영 (신지영, 2023.09.13)
 */

@NoArgsConstructor
@Getter
public class MarryDate {
	
	private String marryDt;
	private Long memberSeq;
	private String totalBudget;

	@Builder
	public MarryDate(String marryDt, Long memberSeq) {
		this.marryDt = marryDt;
		this.memberSeq = memberSeq;
	}	
}
