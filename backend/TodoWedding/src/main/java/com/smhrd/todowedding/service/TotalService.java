package com.smhrd.todowedding.service;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.todowedding.mapper.TotalMapper;
import com.smhrd.todowedding.model.TotalDto;

import lombok.extern.slf4j.Slf4j;

/*

금액 총합, 예상 비용 관련 서비스
tw_budget 테이블에 budget_cost(예상 지출액) 총합 , budget_expense_cost(지출액) 총합
tw_income 테이블에 income_cost(수입액)
tw_marrydate 테이블에 total_budget(결혼 예상금액)
작성자 : 서유광
작성일 : 2023.09.13 */

@Slf4j
@Service
public class TotalService {

	@Autowired
	private TotalMapper totalMapper;

	public Map<String, Object> findTotal(long member_seq) {
		Map<String, Object> result = new HashMap<>();

		try {
			Long budget_sum_cost = totalMapper.find_budget_sum_cost(member_seq); 
			if (budget_sum_cost == null) {
				result.put("budget_sum_cost", 0); // 값이 없으면 0 저장
			} else {
				result.put("budget_sum_cost", budget_sum_cost); // 값이 있으면 해당 값을 저장
			}
		} catch (Exception e) {
			result.put("budget_sum_cost", "오류: " + e.getMessage());
		}

		try {
			Long budget_total_expense_cost = totalMapper.find_budget_sum_expense_cost(member_seq);
			if (budget_total_expense_cost == null) {
				result.put("budget_total_expense_cost", 0);
			} else {
				result.put("budget_total_expense_cost", budget_total_expense_cost);
			}
		} catch (Exception e) {
			result.put("budget_total_expense_cost", "오류: " + e.getMessage());
		}

		try {
			Long incomeTotalCost = totalMapper.find_income_sum_cost(member_seq);
			if (incomeTotalCost == null) {
				result.put("income_total_cost", 0);
			} else {
				result.put("income_total_cost", incomeTotalCost);
			}
		} catch (Exception e) {
			result.put("income_total_cost", "오류: " + e.getMessage());
		}

		try {
			Long marrytotalBudget = totalMapper.find_total_budget(member_seq);
			if (marrytotalBudget == null) {
				result.put("marry_total_budget", 0);
			} else {
				result.put("marry_total_budget", marrytotalBudget);
			}
		} catch (Exception e) {
			result.put("marry_total_budget", "오류: " + e.getMessage());
		}

		return result;
	}
}