package com.smhrd.todowedding.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.BudgetListMapper;
import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.BudgetListDto;
import com.smhrd.todowedding.model.IncomeDto;

import lombok.extern.slf4j.Slf4j;

/*
 * 지출,수입 각각 식별값,비용,날짜,내용 관련 Service
 * 작성자 : 서유광
 * 작성일 : 2023.09.18
 */

@Slf4j
@Service
public class BudgetListService{
	
	@Autowired
    private BudgetListMapper budgetListMapper;
	
	public Map<String, Object> selectBudgetlist(BudgetListDto budgetlistselect) {
        List<BudgetDto> budget = budgetListMapper.selectBudgetlist_budget(budgetlistselect);
        List<IncomeDto> income = budgetListMapper.selectBudgetlist_income(budgetlistselect);

        Map<String, Object> result = new HashMap<>();
        result.put("수입데이터", income);
        result.put("지출데이터", budget);

        return result;
    }
	
	
}
