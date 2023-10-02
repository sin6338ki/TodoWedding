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
    const [Expenses, setExpenses] = useState([]);

    //Pagination
    const limits = 10; // 지출 리스트 개수
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/budget/delete/${budgetSeq}`);

            if (response.data == "삭제 성공") {
                findExpenses(token.userSeq);
            }
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.budget_seq !== budgetSeq));
        } catch (err) {
            console.log("지출리스트 삭제 err : ", err);
        }
    };

    return (
        <div style={{ marginTop: "-20px" }}>
            {sortedExpenses.slice(offset, offset + limits).map((expenses, idx) => {
                return (
                    <div key={idx} className="flex flex-row mt-5 ml-3">
                        <div>
                            <div className="text-xs text-gray-400">
                                {expenses.budget_expense_dt} | {expenses.budget_role}
                            </div>
                            <div>{expenses.budget_item}</div>
                        </div>
                        <div className="self-center ml-auto text-lg font-bold text-[#9f7ffc]">
                            -{addComma(expenses.budget_cost.toString())}원
                        </div>
                        {/* 삭제 버튼 */}
                        <button className="self-center ml-7 mr-3" onClick={() => expenseDelete(expenses.budget_seq)}>
                            {<FaRegTrashAlt />}
                        </button>
                    </div>
                );
            })}

            {/* 더보기 버튼 */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: "-60px" }}>
                {offset + limits <= expenses.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-[20px] text-xs"
                        style={{ color: "#9f7ffc", marginRight: "10px" }}
                    >
                        더보기
                        {/* <img className="zoombutton" src={zoombutton} alt="더보기" width="20px" color="lightgray" /> */}
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
                        <button
                            onClick={() => setPage(1)}
                            className="mt-[20px] text-xs"
                            style={{ color: "#9f7ffc", marginRight: "10px" }}
                        >
                            처음으로
                            <svg height="10" width="50">
                                <line x1="0" y1="0" x2="100" y2="0" style={{ stroke: "lightgray", strokeWidth: "2" }} />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {/* 페이지 처리  */}
            {offset + limits >= expenses.length && (
                <Pagination limits={limits} page={page} setPage={setPage} total={total} />
            )}
        </div>
    );
};

export default ExpenseList;
