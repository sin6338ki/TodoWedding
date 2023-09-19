package com.smhrd.todowedding.service;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
작성일 : 2023.09.13 

* 09.19 유광 : 결혼 총 예상 비용 update,insert 추가
*/

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


		return result;
	}
	
	// 결혼 총 예상 비용 추가
	public ResponseEntity<String> insertTotalBudget(TotalDto totalDto) {
	    int result = totalMapper.insertTotalBudget(totalDto);
	    
	    if (result > 0) {
	        return new ResponseEntity<>("Insert Success", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Insert Fail", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	// 결혼 총 예상 비용 수정
	public ResponseEntity<String> updateTotalBudget(TotalDto totalDto) {
        int result = totalMapper.updateTotalBudget(totalDto);
        
        if (result > 0) {
            return new ResponseEntity<>("Update Success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Update Fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
