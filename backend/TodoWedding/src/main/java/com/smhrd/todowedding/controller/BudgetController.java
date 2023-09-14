package com.smhrd.todowedding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.IncomeDto;
import com.smhrd.todowedding.service.BudgetService;
import com.smhrd.todowedding.service.IncomeService;

import lombok.extern.slf4j.Slf4j;

/* 예산관리 컨트롤러
 * 작성 : 서유광
 * 일자 : 2023.09.11
 */

@Slf4j
@CrossOrigin("http://localhost:3000")
@RestController
public class BudgetController {

	// 지출관련 서비스 의존성
	@Autowired
	private BudgetService budgetService;

	// 수입관련 서비스 의존성
	@Autowired
	private IncomeService incomeService;

	// 지출관리 전체조회 (select)
	@GetMapping("/budget/select")
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
	@GetMapping("/income/select")
	public ResponseEntity<List<IncomeDto>> selectIncome(@RequestBody IncomeDto incomeselect) {
		try {
			List<IncomeDto> result = incomeService.incomeSelect(incomeselect);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}