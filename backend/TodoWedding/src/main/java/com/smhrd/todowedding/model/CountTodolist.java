package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 투두리스트 개수 response용 dto
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */

@AllArgsConstructor
@Getter
public class CountTodolist {

	private String todolistCompleted;
	private int count;
}
