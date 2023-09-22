/**
 * 예산관리내역  지출 전체 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import React from "react";
import { useState } from "react";
import { addComma } from "../utils/numberUtils";
import Pagination from ".././AdminPage/Pagination";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const ExpenseList = ({ expenses = [], findExpenses }, { total }) => {
    const token = useSelector((state) => state.Auth.token);
    const [Expenses, setExpenses] = useState([]); //09.20추가

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
        }
    };

    // 날짜를 최신 순으로 정렬하는 함수
    const sortExpensesByDate = (a, b) => {
        return new Date(b.budget_expense_dt) - new Date(a.budget_expense_dt);
    };

    // 수입 리스트를 날짜순으로 정렬한 후 슬라이스하여 표시
    const sortedExpenses = [...expenses].sort(sortExpensesByDate);

    // 지출내역 삭제
    const expenseDelete = async (budgetSeq) => {
        try {
            console.log("지출리스트 삭제실제, budgetSeq", budgetSeq);
            const response = await axios.delete(`http://172.30.1.7:8085/budget/delete/${budgetSeq}`);
            console.log("지출list 삭제성공 :", response.data);
            // 삭제 추가코드(09.20)
            // 지영 수정 부분 ===============================================
            if (response.data == "삭제 성공") {
                findExpenses(token.userSeq);
            }
            // ==============================================================
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.budget_seq !== budgetSeq));
        } catch (err) {
            console.log("지출리스트 삭제 err : ", err);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-12 ml-3 pt-3 mb-1">
                {/* <div className="text-center font-bold col-span-1 ">NO</div> */}
                <div className="text-center text-xs font-bold col-span-3 ">날짜</div>
                <div className="text-center text-xs font-bold col-span-3 ">지출비용</div>
                <div className="text-center text-xs font-bold col-span-3">내용</div>
                <div className="text-center text-xs font-bold col-span-1">분담</div>
                <div className="text-center text-xs font-bold col-span-2">삭제</div>
            </div>

            {sortedExpenses.slice(offset, offset + limits).map((expenses, idx) => {
                // 새로운 변수를 사용하여 번호 계산
                const itemNumber = (page - 1) * limits + idx + 1;
                return (
                    <div className="grid grid-cols-12 ml-3 pt-3 mb-1" key={idx}>
                        {/* <div className="text-center col-span-1 mt-1 text-xs">{itemNumber}</div> */}
                        <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_expense_dt}</div>
                        <div className="text-center col-span-3 mt-1 text-xs">
                            {addComma(expenses.budget_cost.toString())}원
                        </div>
                        <div className="text-center col-span-3 mt-1 text-xs">{expenses.budget_item}</div>
                        <div className="text-center col-span-1 mt-1 text-xs">{expenses.budget_role}</div>
                        <button
                            onClick={() => expenseDelete(expenses.budget_seq)}
                            className="text-center col-span-2 mt-1 ml-6 text-xs"
                        >
                            {<FaRegTrashAlt />}
                        </button>
                    </div>
                );
            })}

            {/* 더보기 버튼 */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: "40px" }}>
                {offset + limits <= expenses.length && (
                    <button onClick={handleLoadMore} className="mt-[20px]" style={{ color: "#d68aff" }}>
                        더 보기
                        {/* <img className="zoombutton" src={zoombutton} alt="더보기" width="20px" /> */}
                        <svg height="10" width="50">
                            <line x1="0" y1="0" x2="100" y2="0" style={{ stroke: "lightgray", strokeWidth: "2" }} />
                        </svg>
                    </button>
                )}
            </div>

            {/* 첫 페이지로 돌아가는 버튼 */}
            {offset + limits > expenses.length && page > 1 && (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button onClick={() => setPage(1)} className="mt-[20px]" style={{ color: "#d68aff" }}>
                            처음으로
                            <svg height="10" width="50">
                                <line x1="0" y1="0" x2="100" y2="0" style={{ stroke: "lightgray", strokeWidth: "2" }} />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {/* 10개씩 페이지 처리  */}
            {offset + limits >= expenses.length && (
                <Pagination limits={limits} page={page} setPage={setPage} total={total} />
            )}
        </div>
    );
};

export default ExpenseList;
