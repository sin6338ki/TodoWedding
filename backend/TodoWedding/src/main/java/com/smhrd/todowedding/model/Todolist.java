package com.smhrd.todowedding.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 투두리스트 Entity
 * @author 신지영
 * @since 2023.09.05 
 */

@Getter
public class Todolist {
	
	private Long todolistSeq;
	private String todolistContents;
	private String todolist_completed;
	private Long memberSeq;
	private String date;
	
	@Builder
	public Todolist(Long todolistSeq, String todolistContents, Long memberSeq) {
		this.todolistSeq = todolistSeq;
		this.todolistContents = todolistContents;
		this.memberSeq = memberSeq;
	}
	
	@Builder
	public Todolist(Long todolistSeq, String todolistContents, String todolist_completed, Long memberSeq, String date) {
		super();
		this.todolistSeq = todolistSeq;
		this.todolistContents = todolistContents;
		this.todolist_completed = todolist_completed;
		this.memberSeq = memberSeq;
		this.date = date;
	}
}
