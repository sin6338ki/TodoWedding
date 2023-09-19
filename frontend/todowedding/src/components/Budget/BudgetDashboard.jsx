import React from 'react'
import BudgetRoleChart from './BudgetRoleChart'

const BudgetDashboard = ({incomes,expenses,brideCnt,broomCnt,bothCnt,etcCnt}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">Total Expense 📊 </div>
                <div className="text-4xl m-4 text-[#b66dff]">{expenses.length} 건</div>
                <div className="text-xl text-gray-500 m-4">신랑 {broomCnt} %</div>
                <div className="text-xl text-gray-500 m-4">신부 {brideCnt} %</div>
                <div className="text-xl text-gray-500 m-4">공동 {bothCnt} %</div>
                <div className="text-xl text-gray-500 m-4">기타 {etcCnt} %</div>
            </div>
            <div className="my-5  w-full m-auto">
                <div className="my-3 pb-4 font-bold text-gray-500 underline underline-offset-4">지출 분담 그래프</div>
                <BudgetRoleChart brideCnt={brideCnt} broomCnt={broomCnt} bothCnt={bothCnt} etcCnt={etcCnt} className="w-2/3" />
            </div>
    </div>
  )
}

export default BudgetDashboard