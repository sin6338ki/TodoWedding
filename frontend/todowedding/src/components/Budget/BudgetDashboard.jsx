import React from 'react'
import BudgetRoleChart from './BudgetRoleChart'
import IncomeBudgetChart from './IncomeBudgetChart'
import { useState } from 'react'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';


const BudgetDashboard = ({incomes,expenses,brideCnt,broomCnt,bothCnt,etcCnt}) => {
  
  // (수입/지출) 백분율 계산 
  const totalExpenses = expenses.length;
  const totalIncomes  = incomes.length;
  const expensePercentage = (totalExpenses / (totalExpenses + totalIncomes)) * 100;
  const incomePercentage = (totalIncomes / (totalExpenses + totalIncomes)) * 100;
  console.log(Number(incomePercentage));
  console.log(Number(expensePercentage));

  
  // 지출 분담 비율 계산 
  const broomPercentage = (broomCnt/totalExpenses)*100
  const bridePercentage = (brideCnt/totalExpenses)*100
  const bothPercentage  = (bothCnt/totalExpenses)*100
  const etcPercentage   = (etcCnt/totalExpenses)*100
  

  // 여기서부터 BudgetReport.jsx 코드
  const [totalBudget, setTotalBudget] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0); // 총수입
  const [totalExpense, setTotalExpense] = useState(0); // 총지출

  //userSeq 받아오기
  const token = useSelector((state) => state.Auth.token);
  const userSeq = token ? token.userSeq : 0;

  // 총 예산/수입/지출 결과 불러오기
  useEffect(() => {
      const fetchTotalBudgetAndResult = async () => {
          try {
              // 백엔드로 총예산 조회 요청 보내기
              // const budgetResponse = await axios.get(`http://172.30.1.7:8085/totalbudget/select/${userSeq}`);
              const budgetResponse = await axios.get(`http://172.30.1.7:8085/totalbudget/select/${userSeq}`);
              if (budgetResponse.data) {
                  setTotalBudget(budgetResponse.data.total_budget);
                  console.log("등록된 총 예산 : ", budgetResponse.data.total_budget);
              }

              // 백엔드로 수입/지출 결과 조회 요청 보내기
              // const resultResponse = await axios.post(`http://172.30.1.7:8085/member/total`, { member_seq: userSeq });
              const resultResponse = await axios.post(`http://172.30.1.7:8085/member/total`, { member_seq: userSeq });
              console.log("BudgetReport 결과 : ", resultResponse.data);

              setTotalIncome(resultResponse.data.income_total_cost);
              setTotalExpense(resultResponse.data.budget_sum_cost);
          } catch (error) {
              console.error("데이터 조회 에러 : ", error);
          }
      };
      fetchTotalBudgetAndResult();
  }, [userSeq]);

  const fianlTotalBudget = (totalBudget || 0); // 총 예산
  const fianlTotalIncome = (totalIncome || 0); // 총 수입
  console.log('총수입꺼내옴:', fianlTotalIncome);
  const fianlTotalExpense = (totalExpense || 0); //총 지출
  console.log('총지출꺼내옴:', fianlTotalExpense);
 // const balance = fianlTotalBudget + fianlTotalIncome - fianlTotalExpense; // 잔액

  
  
  
  

  return (
    <div className="grid grid-cols-2 gap-4"> 
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">Total Expense 📊 </div>
                <div className="text-4xl m-4 text-[#b66dff]">{expenses.length} 건</div>
                <div className="text-s text-gray-500 m-4">신랑 {broomPercentage.toFixed(2)} %</div>
                <div className="text-s text-gray-500 m-4">신부 {bridePercentage.toFixed(2)} %</div>
                <div className="text-s text-gray-500 m-4">공동 {bothPercentage.toFixed(2)} %</div>
                <div className="text-s text-gray-500 m-4">기타 {etcPercentage.toFixed(2)} %</div>
            </div>
            <div className="my-5  w-full m-auto">
                <div className="my-3 pb-4 font-bold text-gray-500 underline underline-offset-4">지출 분담 그래프</div>
                <BudgetRoleChart brideCnt={brideCnt} broomCnt={broomCnt} bothCnt={bothCnt} etcCnt={etcCnt} className="w-2/3" />
            </div>
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">💰 수입 지출 그래프</div>
                <div className="text-s text-gray-500 m-4">수입 {incomePercentage.toFixed(2)}  %</div>
                <div className="text-s text-gray-500 m-4">지출 {expensePercentage.toFixed(2)} %</div>           
            </div>
         
            <div className='my-5 w-full m-auto'>
              <IncomeBudgetChart fianlTotalIncome={fianlTotalIncome} fianlTotalExpense={fianlTotalExpense}  style={{height: '100px', width: '100px'}}/>
            </div>
    </div>
  )
}

export default BudgetDashboard