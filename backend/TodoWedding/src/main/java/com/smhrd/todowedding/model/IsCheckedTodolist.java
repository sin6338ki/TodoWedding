package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 체크리스트 완료 여부 변경 관련 DTO
 * @author 신지영
 * @since 2023.09.06
 */

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class IsCheckedTodolist {

	private char todolistCompleted;
	private Long todolistSeq;
	private Long memberSeq;
	
}
