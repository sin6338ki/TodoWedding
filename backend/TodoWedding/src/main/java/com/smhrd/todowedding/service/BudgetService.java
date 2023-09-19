package com.smhrd.todowedding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.BudgetMapper;
import com.smhrd.todowedding.model.BudgetDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 지출 관련 Service
 * 작성자 : 서유광
 * 작성일 : 2023.09.11
 */

@Slf4j
@Service
public class BudgetService {
	
	// 예산 관리 매퍼
	@Autowired
	private BudgetMapper budgetMapper;
	
	
	
	
	// 지출 전체 조회
	public List<BudgetDto> budgetSelect(BudgetDto budgetselect) {
		return budgetMapper.selectBudget(budgetselect);
	}
	
	
	// 지출 관리 추가
	public void budgetInsert(BudgetDto budgetinsert) {
		budgetMapper.insertBudget(budgetinsert);
	}
	
	// 지출 관리 수정
	public void budgetUpdate(BudgetDto budgetupdate) {
		budgetMapper.updateBudget(budgetupdate);
		
	}

	// 지출 항목 삭제
	public int deleteBudget(Long budget_seq) {
	    return budgetMapper.deleteBudget(budget_seq);
	}
	
	
}
