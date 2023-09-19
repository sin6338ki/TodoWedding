

/**
 * 예산관리  지출 전체 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import React from 'react'

const ExpenseList = ({ expenses = [] }) => {
  return (
    <div>
         <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-3 ">NO</div>
                <div className="text-center font-bold col-span-3 ">날짜</div>
                <div className="text-center font-bold col-span-3 ">지출비용</div>
                <div className="text-center font-bold col-span-3">지출내역</div>
        </div>  
                {expenses.map((expenses, idx) => {
                    return (
                        <div className='grid grid-cols-12 ml-3 pt-3 mb-5' key={idx}>
                            <div className="text-center col-span-3 mt-1 text-xs">{idx + 1}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_expense_dt}</div>
                            <div className="text-center col-span-3 mt-2 text-xs">{expenses.budget_cost}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_item}</div>          
                        </div>
                    );
                })}            
    </div>
  )
}

export default ExpenseList