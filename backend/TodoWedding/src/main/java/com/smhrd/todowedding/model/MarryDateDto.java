package com.smhrd.todowedding.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * marryDate DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.04
 */
@AllArgsConstructor
@Getter
public class MarryDateDto {

	//데이터 포맷 변환
	@JsonFormat(pattern = "yyyy.MM.dd") 
	private String marryDt;
	private Long memberSeq;
	
}
