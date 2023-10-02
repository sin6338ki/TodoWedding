package com.smhrd.todowedding.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.BudgetListDto;
import com.smhrd.todowedding.model.IncomeDto;
import com.smhrd.todowedding.service.BudgetListService;
import com.smhrd.todowedding.service.BudgetService;
import com.smhrd.todowedding.service.IncomeService;

import lombok.extern.slf4j.Slf4j;

/** 예산관리 컨트롤러
 * @author 서유광
 * @since 2023.09.11
 */

@Slf4j
@RestController
public class BudgetController {

	// 지출관련 서비스 의존성
	@Autowired
	private BudgetService budgetService;

	// 수입관련 서비스 의존성
	@Autowired
	private IncomeService incomeService;
	
	// 수입,지출 서비스 의존성 유광추가 09.18
	@Autowired
	private BudgetListService budgetlistService;

	// 지출관리 전체조회 (select)
	@PostMapping("/budget/select")
	public ResponseEntity<List<BudgetDto>> selectBudget(@RequestBody BudgetDto budgetselect) {
		try {
			List<BudgetDto> result = budgetService.budgetSelect(budgetselect);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 지출괸리 삽입 (insert)
	@PostMapping("/budget/insert")
	public ResponseEntity<String> insertBudget(@RequestBody BudgetDto budgetinsert) {
		log.info("프론트에서 넘어온 데이터 값 "+budgetinsert);
		try {
			budgetService.budgetInsert(budgetinsert);
			return new ResponseEntity<>("지출관리 입력 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("지출관리 입력 실패 : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// 지출관리 수정 (update)
	@PostMapping("/budget/update")
	public ResponseEntity<String> updateBudget(@RequestBody BudgetDto budgetupdate) {
		try {
			budgetService.budgetUpdate(budgetupdate);
			return new ResponseEntity<>("지출관리 수정 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("지출관리 수정 실패 : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// 지출항목 삭제 (delete)
	@DeleteMapping(value="budget/delete/{budget_seq}")
	public ResponseEntity<String> deleteBudget(@PathVariable(name="budget_seq") Long budget_seq) {
	    int result = budgetService.deleteBudget(budget_seq);

	    if (result > 0) { // 삭제된 행이 하나 이상 있다면
	        return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
	    } else { // 삭제된 행이 없다면
	        return new ResponseEntity<>("삭제 실패", HttpStatus.NOT_FOUND);
	    }
	}
	
	// 수입항목 삭제 (delete)
	@DeleteMapping(value="income/delete/{income_seq}")
	public ResponseEntity<String> deleteIncome(@PathVariable(name="income_seq") Long income_seq) {
		int result = incomeService.deleteIncome(income_seq);
		
		if (result > 0) { // 삭제된 행이 하나 이상 있다면
			return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
		} else { // 삭제된 행이 없다면
			return new ResponseEntity<>("삭제 실패", HttpStatus.NOT_FOUND);
		}
	}
	
	// 수입관리 추가 (insert)
	@PostMapping("/income/insert")
	public ResponseEntity<String> insertIncome(@RequestBody IncomeDto incomeinsert) {
	
		try {
			incomeService.incomeInsert(incomeinsert);
			return new ResponseEntity<>("수입관리 입력 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("수입관리 입력 실패 : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 수입관리 수정 (update)
	@PostMapping("/income/update")
	public ResponseEntity<String> updateIncome(@RequestBody IncomeDto incomeupdate) {
		try {
			incomeService.incomeUpdate(incomeupdate);
			return new ResponseEntity<>("수입관리 입력 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("수입관리 입력 실패 : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 수입관리 전체조회 (select)
	@PostMapping("/income/select")
	public ResponseEntity<List<IncomeDto>> selectIncome(@RequestBody IncomeDto incomeselect) {
		try {
			List<IncomeDto> result = incomeService.incomeSelect(incomeselect);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// income(식별값,비용,날짜,내용), budget(식별값,비용,날짜,내용) 데이터 전송 (select) 
	@PostMapping("/budgetlist/select")
	public ResponseEntity<Map<String, Object>> selectBudget(@RequestBody BudgetListDto budgetlistselect) {
	    Map<String, Object> result = budgetlistService.selectBudgetlist(budgetlistselect);
	    return new ResponseEntity<>(result, HttpStatus.OK);
	}

}