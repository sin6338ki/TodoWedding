package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 투두리스트 개수 response용 dto
 * @author 신지영
 * @since 2023.09.05
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class CountTodolist {

	private String todolistCompleted;
	private int count;
}
