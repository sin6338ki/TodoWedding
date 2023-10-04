import React from "react";
import BudgetRoleChart from "./BudgetRoleChart";
import IncomeBudgetChart from "./IncomeBudgetChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

/* Budget 예산관리 대시보드
 * 작성자 : 양수진
 * 작성일 : 2023.09.12
 */

const BudgetDashboard = ({ incomes, expenses, brideCnt, broomCnt, bothCnt, etcCnt }) => {
    // (수입/지출) 백분율 계산
    const totalExpenses = expenses.length;

    // 지출 분담 비율 계산
    // const broomPercentage = (broomCnt / totalExpenses) * 100;
    // const bridePercentage = (brideCnt / totalExpenses) * 100;
    // const bothPercentage = (bothCnt / totalExpenses) * 100;
    // const etcPercentage = (etcCnt / totalExpenses) * 100;

    let broomPercentage = 0,
        bridePercentage = 0,
        bothPercentage = 0,
        etcPercentage = 0;

    if (totalExpenses !== 0) {
        broomPercentage = (broomCnt / totalExpenses) * 100;
        bridePercentage = (brideCnt / totalExpenses) * 100;
        bothPercentage = (bothCnt / totalExpenses) * 100;
        etcPercentage = (etcCnt / totalExpenses) * 100;
    }

    const [totalBudget, setTotalBudget] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    // 수입, 지출 백분율 계산 ================================================
    const [expensePercentage, setExpensePercentage] = useState(0);
    const [incomePercentage, setIncomePercentage] = useState(0);

    // useEffect(() => {
    //     const tempExpense = (totalExpense / (totalIncome + totalExpense)) * 100;
    //     const tempIncome = (totalIncome / (totalIncome + totalExpense)) * 100;
    //     setExpensePercentage(Math.round(tempExpense));
    //     setIncomePercentage(Math.round(tempIncome));
    // }, [totalIncome, totalExpense]);

    useEffect(() => {
        let tempExpense = 0;
        let tempIncome = 0;

        if (totalIncome + totalExpense !== 0) {
            tempExpense = (totalExpense / (totalIncome + totalExpense)) * 100;
            tempIncome = (totalIncome / (totalIncome + totalExpense)) * 100;
        }

        setExpensePercentage(Math.round(tempExpense));
        setIncomePercentage(Math.round(tempIncome));
    }, [totalIncome, totalExpense]);

    // ================================================================================

    // 총 예산/수입/지출 결과 불러오기
    useEffect(() => {
        const fetchTotalBudgetAndResult = async () => {
            try {
                // 백엔드로 총예산 조회 요청 보내기
                const budgetResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/totalbudget/select/${userSeq}`
                );
                if (budgetResponse.data) {
                    setTotalBudget(budgetResponse.data.total_budget);
                }

                // 백엔드로 수입/지출 결과 조회 요청 보내기
                const resultResponse = await axios.post(`${process.env.REACT_APP_API_URL}/member/total`, {
                    member_seq: userSeq,
                });
                setTotalIncome(resultResponse.data.income_total_cost);
                setTotalExpense(resultResponse.data.budget_sum_cost);
            } catch (error) {
                console.error("데이터 조회 에러 : ", error);
            }
        };
        fetchTotalBudgetAndResult();
    }, [userSeq, incomes, expenses]);

    const fianlTotalIncome = totalIncome || 0; // 총 수입
    const fianlTotalExpense = totalExpense || 0; //총 지출

    return (
        <div>
            <div className="rounded-md border shadow-md text-black bg-violet-100">
                <div className="text-lg font-bold text-black-500 m-3" style={{ textAlign: "center" }}>
                    수입 지출 그래프
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="text-gray-800 mb-3 mx-3" style={{ textAlign: "center" }}>
                        수입 {incomePercentage} %{""}
                    </div>
                    <div className="text-gray-800 mb-3 mx-3" style={{ textAlign: "center" }}>
                        지출 {expensePercentage} %
                    </div>
                </div>
            </div>

            <div className="my-5 w-full m-auto">
                <IncomeBudgetChart
                    fianlTotalIncome={fianlTotalIncome}
                    fianlTotalExpense={fianlTotalExpense}
                    style={{ height: "100px", width: "100px" }}
                />
            </div>

            <div className="rounded-md border shadow-md text-black bg-violet-100">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="text-lg font-bold text-black-500 mt-4 mx-3" style={{ textAlign: "center" }}>
                        웨딩 지출 통계{" "}
                    </div>
                    <div className="text-xl font-bold mt-4 mx-3 text-[#8c6adb]" style={{ textAlign: "center" }}>
                        총 {expenses.length} 건
                    </div>
                </div>
                <div className="text-m text-gray-800 m-3" style={{ textAlign: "center" }}>
                    신랑 {broomPercentage.toFixed(0)}% | 신부 {bridePercentage.toFixed(0)}% | 공동{" "}
                    {bothPercentage.toFixed(0)}% | 기타 {etcPercentage.toFixed(0)}%{" "}
                </div>
            </div>
            <div className="my-3">
                <BudgetRoleChart
                    broomPercentage={broomPercentage}
                    bridePercentage={bridePercentage}
                    bothPercentage={bothPercentage}
                    etcPercentage={etcPercentage}
                    className="w-2/3"
                />
            </div>
        </div>
    );
};

export default BudgetDashboard;
