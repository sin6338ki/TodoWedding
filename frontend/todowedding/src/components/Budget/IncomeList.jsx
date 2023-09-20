
/**
 * 예산관리 수입 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import React from 'react'
import { useState } from 'react';
import { addComma } from "../utils/numberUtils";
import Pagination from ".././AdminPage/Pagination";
import axios from 'axios';

const IncomeList = ({ incomes = [] },{total}) => {

    //Pagination
    const limits = 5;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limits;

       // 더보기 버튼 클릭 시 다음페이지 이동 
       const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);

      // 맨 마지막 페이지 첫 페이지로 이동
        if (offset + limits >= incomes.length) {
          setPage(1); 
      };
    }
    
  // 날짜를 최신 순으로 정렬하는 함수
  const sortIncomesByDate = (a, b) => {
    return new Date(b.income_dt) - new Date(a.income_dt);
  };

   // 수입 리스트를 날짜순으로 정렬한 후 슬라이스하여 표시
   const sortedIncomes = [...incomes].sort(sortIncomesByDate);

   // 삭제 
   const incomeDelete = async(incomeSeq) => {
    try{
     console.log("income리스트 삭제실행 , incomeSeq" , incomeSeq);
     const response = await axios.delete(`http://localhost:8085/income/delete/${incomeSeq}`)
     console.log("incomelist 삭제성공 :" , response.data);
     // 화면에서 삭제효과
    
    } catch (err) {
       console.error("incomeList 삭제 error : ", err);
    }
  };


  return (
    <div>
         <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-1 ">NO</div>
                <div className="text-center font-bold col-span-3 ">날짜</div>
                <div className="text-center font-bold col-span-3 ">수입비용</div>
                <div className="text-center font-bold col-span-3">수입내역</div>
                <div className="text-center font-bold col-span-1">delete</div>
         </div>
         
        
                {sortedIncomes.slice(offset, offset + limits).map((incomes, idx) => {
                   // 새로운 변수를 사용하여 번호 계산
                   const itemNumber = (page - 1) * limits + idx + 1;
                    return (            
                        <div className='grid grid-cols-12 ml-3 pt-3 mb-5' key={idx}>
                            <div className="text-center col-span-1 mt-1 text-xs">{itemNumber}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{incomes.income_dt}</div>
                            <div className="text-center col-span-3 mt-2 text-xs">{addComma(incomes.income_cost.toString())}원</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{incomes.income_contents}</div>
                            {/* 삭제 버튼 */}
                            <button onClick={() => incomeDelete(incomes.income_seq)} className="text-center col-span-2 mt-1 text-xs">
                              삭제
                            </button>          
                        </div>
                    );
                })}  

              {/* 더보기 버튼 */}
              {offset + limits <= incomes.length && (
                  <button onClick={handleLoadMore} className='mt-[20px]'>
                    더 보기
                  </button>
                )}

               {/* 첫 페이지로 돌아가는 버튼 */}
              {offset + limits > incomes.length &&  page > 1 && (
                <>
                <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setPage(1)} className='mt-[20px]'>
                    처음으로
                  </button>
                  </div>
                  </>
                )}


                {/* 10개씩 페이지 처리  */}
                 {offset + limits >= incomes.length && (
                <Pagination limits={limits} page={page} setPage={setPage} total={total} />)}
                  
    </div>
  )
}

export default IncomeList