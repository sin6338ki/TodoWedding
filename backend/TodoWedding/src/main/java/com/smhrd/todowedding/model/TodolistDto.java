package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 투두리스트 관련 DTO
 * - todolistContents(String), todolistCompleted(String), memberSeq(int)
 *  작성자 : 신지영
 *  작성일 : 2023.09.05 
 */

@AllArgsConstructor
@Getter
public class TodolistDto {

	private String todolistContents;
	private Long memberSeq;
}
