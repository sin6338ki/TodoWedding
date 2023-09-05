package com.smhrd.todowedding.model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 결혼식 D-day Entity
 * 작성 : 신지영]
 * 일자 : 2023.09.04
 */
@AllArgsConstructor
@Getter
public class MarryDate {
	
	private int marryDtSeq;
	private String marryDt;
	private int memberSeq;
	
}
