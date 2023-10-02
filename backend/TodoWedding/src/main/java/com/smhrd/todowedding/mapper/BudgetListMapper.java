package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.BudgetListDto;
import com.smhrd.todowedding.model.IncomeDto;

/**
 * 지출,수입 각각 식별값,비용,날짜,내용 관련 매퍼
 * @author 서유광
 * @since 2023.09.18
 */

@Mapper
public interface BudgetListMapper {
	
	// 지출 관리 전체 조회
    @Select("SELECT * FROM tw_budget where member_seq= #{member_seq} ")
    public List<BudgetDto> selectBudgetlist_budget(BudgetListDto budgetlist);
       
    // 지출 관리 전체 조회
    @Select("SELECT * FROM tw_income where member_seq= #{member_seq} ")
    public List<IncomeDto> selectBudgetlist_income(BudgetListDto budgetlist);
    
}
