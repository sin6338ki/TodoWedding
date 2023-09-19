package com.smhrd.todowedding.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.todowedding.model.TotalDto;
import com.smhrd.todowedding.service.MarryDateService;
import com.smhrd.todowedding.service.TotalService;

import lombok.extern.slf4j.Slf4j;

/*
 * 금액 총합, 예상 비용 관련 컨틀롤러
 *  - tw_budget 테이블에 budget_cost(예상 지출액) 총합 , budget_expense_cost(지출액) 총합
 *  - tw_income 테이블에 income_cost(수입액)
 *  - tw_marrydate 테이블에 total_budget(결혼 예상금액)
 *  작성자 : 서유광
 *  작성일 : 2023.09.13
 *  09.19 유광 : 결혼 총 예상 비용 update,insert 추가
 */

@Slf4j
@CrossOrigin(origins = {"http://172.30.1.7:3000", "http://localhost:3000"})
@RestController
public class TotalController {
    
    @Autowired
    private TotalService totalService;
    
    // budget_cost, budget_expense_cost 조회 
    @PostMapping("/member/total")
    public ResponseEntity<Map<String, Object>> findTotal (@RequestBody TotalDto totalDto){
        return ResponseEntity.ok(totalService.findTotal(totalDto.getMember_seq())); 
    }

    // 결혼 총 예상 비용 추가
    @PostMapping("/totalbudget/insert")
    public ResponseEntity<String> insertTotalBudget(@RequestBody TotalDto totalDto) {
        return totalService.insertTotalBudget(totalDto);
    }
    
    // 결혼 총 예상 비용 수정
    @PostMapping("/totalbudget/update")
    public ResponseEntity<String> updateTotalBudget(@RequestBody TotalDto totalDto) {
        return totalService.updateTotalBudget(totalDto);
    }

}
