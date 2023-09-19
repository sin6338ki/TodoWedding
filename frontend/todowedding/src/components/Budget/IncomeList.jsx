import React from 'react'

const IncomeList = ({ incomes = [] }) => {
  return (
    <div>
         <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-3 ">NO</div>
                <div className="text-center font-bold col-span-3 ">날짜</div>
                <div className="text-center font-bold col-span-3 ">수입비용</div>
                <div className="text-center font-bold col-span-3">수입내역</div>
         </div>
         
                {incomes.map((incomes, idx) => {
                    return (            
                        <div className='grid grid-cols-12 ml-3 pt-3 mb-5' key={idx}>
                            <div className="text-center col-span-3 mt-1 text-xs">{idx + 1}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{incomes.income_dt}</div>
                            <div className="text-center col-span-3 mt-2 text-xs">{incomes.income_cost}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{incomes.income_contents}</div>         
                        </div>
                    );
                })}      
    </div>
  )
}

export default IncomeList