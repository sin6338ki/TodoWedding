package com.smhrd.todowedding.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
 * 스케줄 추가 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.06
 */

@Getter
@NoArgsConstructor
public class Schedule {
	private Long scheduleSeq;
	private String scheduleStartDt;
	private String scheduleEndDt;
	private String scheduleContents;
	private Long memberSeq;
	
	@Builder
	public Schedule(String scheduleStartDt, String scheduleEndDt, String scheduleContents) {
		this.scheduleStartDt = scheduleStartDt;
		this.scheduleEndDt = scheduleEndDt;
		this.scheduleContents = scheduleContents;
	}
	
	@Builder
	public Schedule(String scheduleStartDt, String scheduleEndDt, String scheduleContents, Long memberSeq) {
		this.scheduleStartDt = scheduleStartDt;
		this.scheduleEndDt = scheduleEndDt;
		this.scheduleContents = scheduleContents;
		this.memberSeq = memberSeq;
	}
	
	@Builder
	public Schedule(Long scheduleSeq, String scheduleStartDt, String scheduleEndDt, String scheduleContents, Long memberSeq) {
		this.scheduleSeq = scheduleSeq;
		this.scheduleStartDt = scheduleStartDt;
		this.scheduleEndDt = scheduleEndDt;
		this.scheduleContents = scheduleContents;
		this.memberSeq = memberSeq;
	}
}
