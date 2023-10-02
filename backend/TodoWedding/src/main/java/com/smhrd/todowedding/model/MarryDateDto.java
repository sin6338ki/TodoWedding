package com.smhrd.todowedding.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * marryDate DTO
 * @author 신지영
 * @since 2023.09.04
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MarryDateDto {

	//데이터 포맷 변환
	@JsonFormat(pattern = "yyyy.MM.dd") 
	private String marryDt;
	private Long memberSeq;
	
}
