

/**
 * 예산관리내역  지출 전체 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import React from 'react'
import { useState } from 'react';
import { addComma } from "../utils/numberUtils";
import Pagination from ".././AdminPage/Pagination";

const ExpenseList = ({ expenses = [] },{total}) => {

        //Pagination
        const limits = 5;
        const [page, setPage] = useState(1);
        const offset = (page - 1) * limits;

        // 더보기 버튼 클릭 시 다음페이지 이동 
        const handleLoadMore = () => {
          setPage((prevPage) => prevPage + 1);

        // 맨 마지막 페이지 첫 페이지로 이동
          if (offset + limits >= expenses.length) {
            setPage(1); 
        };
      }
      

        // 날짜를 최신 순으로 정렬하는 함수
  const sortExpensesByDate = (a, b) => {
    return new Date(b.budget_expense_dt) - new Date(a.budget_expense_dt);
  };

  // 수입 리스트를 날짜순으로 정렬한 후 슬라이스하여 표시
   const sortedExpenses = [...expenses].sort(sortExpensesByDate);

  return (
    <div>
         <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-2 ">NO</div>
                <div className="text-center font-bold col-span-3 ">날짜</div>
                <div className="text-center font-bold col-span-2 ">지출비용</div>
                <div className="text-center font-bold col-span-3">내역</div>
                <div className="text-center font-bold col-span-2">분담</div>
        </div> 
         
                {sortedExpenses.slice(offset, offset + limits).map((expenses, idx) => {            
                   // 새로운 변수를 사용하여 번호 계산
                    const itemNumber = (page - 1) * limits + idx + 1;
                    return (
                        <div className='grid grid-cols-12 ml-3 pt-3 mb-5' key={idx}>
                            <div className="text-center col-span-2 mt-1 text-xs">{itemNumber}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_expense_dt}</div>
                            <div className="text-center col-span-2 mt-2 text-xs">{addComma(expenses.budget_cost.toString())}원</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_item}</div>        
                            <div className="text-center col-span-2 mt-1 text-xs">{expenses.budget_role}</div>     
                        </div>
                  
                       );
                    })} 
                
              {/* 더보기 버튼 */}
              {offset + limits <= expenses.length && (
                  <button onClick={handleLoadMore} className='mt-[20px]'>
                    더 보기
                  </button>
                )}

               {/* 첫 페이지로 돌아가는 버튼 */}
              {offset + limits > expenses.length &&  page > 1 && (
                <>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setPage(1)} className='mt-[20px]'>
                    처음으로
                  </button>
                  </div>
                </>
                )}



                 {/* 10개씩 페이지 처리  */}
                 {offset + limits >= expenses.length && (
                <Pagination limits={limits} page={page} setPage={setPage} total={total} />)}                 
     </div>
   )
}

                          
export default ExpenseList