package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 투두리스트 관련 DTO
 * - todolistContents(String), todolistCompleted(String), memberSeq(int)
 * @author 신지영
 * @since 2023.09.05 
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class TodolistDto {

	private String todolistContents;
	private Long memberSeq;
	
}
