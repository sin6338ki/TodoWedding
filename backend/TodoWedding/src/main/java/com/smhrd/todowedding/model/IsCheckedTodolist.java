package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 체크리스트 완료 여부 변경 관련 DTO
 * 작성자 : 신지영
 * 작성일 : 2023.09.06
 */
@AllArgsConstructor
@Getter
public class IsCheckedTodolist {

	private char todolistCompleted;
	private Long todolistSeq;
	private Long memberSeq;
	
}
