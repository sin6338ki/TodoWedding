import React from 'react'
import BudgetRoleChart from './BudgetRoleChart'
import IncomeBudgetChart from './IncomeBudgetChart'


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
  
  
  
  
  

  return (
    <div className="grid grid-cols-2 gap-4"> 
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">Total Expense 📊 </div>
                <div className="text-4xl m-4 text-[#b66dff]">{expenses.length} 건</div>
                <div className="text-xl text-gray-500 m-4">신랑 {broomPercentage.toFixed(2)} %</div>
                <div className="text-xl text-gray-500 m-4">신부 {bridePercentage.toFixed(2)} %</div>
                <div className="text-xl text-gray-500 m-4">공동 {bothPercentage.toFixed(2)} %</div>
                <div className="text-xl text-gray-500 m-4">기타 {etcPercentage.toFixed(2)} %</div>
            </div>
            <div className="my-5  w-full m-auto">
                <div className="my-3 pb-4 font-bold text-gray-500 underline underline-offset-4">지출 분담 그래프</div>
                <BudgetRoleChart brideCnt={brideCnt} broomCnt={broomCnt} bothCnt={bothCnt} etcCnt={etcCnt} className="w-2/3" />
            </div>
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">💰 수입 지출 그래프</div>
                <div className="text-xl text-gray-500 m-4">수입 {incomePercentage.toFixed(2)}  %</div>
                <div className="text-xl text-gray-500 m-4">지출 {expensePercentage.toFixed(2)} %</div>           
            </div>
            <div className='my-5 w-full m-auto'>
              <IncomeBudgetChart incomePercentage={incomePercentage.toFixed(2)} expensePercentage={expensePercentage.toFixed(2)}/>
            </div>
    </div>
  )
}

export default BudgetDashboard