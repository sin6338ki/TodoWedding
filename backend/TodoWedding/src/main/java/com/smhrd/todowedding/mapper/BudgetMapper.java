package com.smhrd.todowedding.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.todowedding.model.BudgetDto;
import com.smhrd.todowedding.model.IncomeDto;

/*
 * 예산 관련 Mapper
 * 작성자 : 서유광
 * 작성일 : 2023.09.11
 */

// 예산 관리 매퍼
@Mapper
public interface BudgetMapper {

	// 지출 관리 정보 추가
	@Insert("INSERT INTO tw_budget(budget_item, budget_expense_dt, budget_cost, budget_role, budget_memo, budget_expense_cost, member_seq) VALUES(#{budget_item}, #{budget_expense_dt}, #{budget_cost}, #{budget_role}, #{budget_memo}, #{budget_expense_cost}, #{member_seq})")
	public void insertBudget(BudgetDto budget);

	// 지출 관리 정보 수정
	@Update("UPDATE tw_budget SET budget_item = #{budget_item}, budget_expense_dt = #{budget_expense_dt}, budget_cost = #{budget_cost}, budget_role = #{budget_role} , budget_memo = #{budget_memo} , budget_expense_cost= #{budget_expense_cost}, member_seq= #{member_seq} WHERE budget_seq= #{budget_seq}")
	public void updateBudget(BudgetDto budget);
	
	// 지출 관리 전체 조회
	@Select("SELECT budget_seq, budget_item, STR_TO_DATE(budget_expense_dt, '%Y-%m-%d') as budget_expense_dt, budget_cost, budget_role, budget_memo, budget_expense_cost, member_seq FROM tw_budget where member_seq= #{member_seq} ORDER BY STR_TO_DATE(budget_expense_dt, '%Y-%m-%d') ASC")
	public List<BudgetDto> selectBudget(BudgetDto budget);
    
    // 수입 관리 정보 추가
    @Insert("INSERT INTO tw_income(income_dt, income_cost, income_contents, member_seq) VALUES(#{income_dt}, #{income_cost}, #{income_contents}, #{member_seq})")
    public void insertIncome(IncomeDto incomeinsert);
	
    // 수입 관리 정보 수정
    @Update("UPDATE tw_income SET income_dt = #{income_dt}, income_cost = #{income_cost}, income_contents = #{income_contents} WHERE income_seq = #{income_seq}")
    public void updateIncome(IncomeDto incomeupdate);
    
    // 수입 관리 정보 조회
    @Select("SELECT income_seq, income_dt, income_cost, income_contents, member_seq FROM tw_income where member_seq= #{member_seq} ")
    public List<IncomeDto> selectIncome(IncomeDto income);
	
}
