package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/*
 * 투두리스트 Entity
 *  작성자 : 신지영
 *  작성일 : 2023.09.05 
 */


@AllArgsConstructor
@Getter
public class Todolist {
	
	private Long todolistSeq;
	private String todolistContents;
	private String todolist_completed;
	private Long memberSeq;
	
	@Builder
	public Todolist(Long todolistSeq, String todolistContents, Long memberSeq) {
		this.todolistSeq = todolistSeq;
		this.todolistContents = todolistContents;
		this.memberSeq = memberSeq;
	}
	
}
