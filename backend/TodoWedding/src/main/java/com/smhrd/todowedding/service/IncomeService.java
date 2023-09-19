package com.smhrd.todowedding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.BudgetMapper;
import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.IncomeDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 수입 관련 Service
 * 작성자 : 서유광
 * 작성일 : 2023.09.11
 */

@Slf4j
@Service
public class IncomeService {
	
	// 예산 관리 매퍼
	@Autowired
	private BudgetMapper budgetMapper;

	// 수입 추가
	public void incomeInsert(IncomeDto incomeinsert) {
		budgetMapper.insertIncome(incomeinsert);
	}
	
	// 수입 수정
	public void incomeUpdate(IncomeDto incomeupdate) {
		budgetMapper.updateIncome(incomeupdate);
	}
	
	// 수입 조회
	public List<IncomeDto> incomeSelect(IncomeDto incomeselect) {
		return budgetMapper.selectIncome(incomeselect);
	}
	
	// 수입 항목 삭제
	public int deleteIncome(Long income_seq) {
	    return budgetMapper.deleteIncome(income_seq);
	}

}
