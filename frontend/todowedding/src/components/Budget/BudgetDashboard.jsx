import React from "react";
import BudgetRoleChart from "./BudgetRoleChart";
import IncomeBudgetChart from "./IncomeBudgetChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const BudgetDashboard = ({ incomes, expenses, brideCnt, broomCnt, bothCnt, etcCnt }) => {
    // (수입/지출) 백분율 계산
    const totalExpenses = expenses.length;
    const totalIncomes = incomes.length;

    // 지출 분담 비율 계산
    const broomPercentage = (broomCnt / totalExpenses) * 100;
    const bridePercentage = (brideCnt / totalExpenses) * 100;
    const bothPercentage = (bothCnt / totalExpenses) * 100;
    const etcPercentage = (etcCnt / totalExpenses) * 100;

    // 여기서부터 BudgetReport.jsx 코드
    const [totalBudget, setTotalBudget] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0); // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //지영 수정 (수입, 지출 백분율 계산) ================================================
    const [expensePercentage, setExpensePercentage] = useState();
    const [incomePercentage, setIncomePercentage] = useState();

    useEffect(() => {
        const tempExpense = (totalExpense / (totalIncome + totalExpense)) * 100;
        const tempIncome = (totalIncome / (totalIncome + totalExpense)) * 100;
        setExpensePercentage(Math.round(tempExpense));
        setIncomePercentage(Math.round(tempIncome));
    }, [totalIncome, totalExpense]);

    // ================================================================================

    // 총 예산/수입/지출 결과 불러오기
    useEffect(() => {
        const fetchTotalBudgetAndResult = async () => {
            try {
                // 백엔드로 총예산 조회 요청 보내기
                const budgetResponse = await axios.get(`http://localhost:8085/totalbudget/select/${userSeq}`);
                if (budgetResponse.data) {
                    setTotalBudget(budgetResponse.data.total_budget);
                    console.log("등록된 총 예산 : ", budgetResponse.data.total_budget);
                }

                // 백엔드로 수입/지출 결과 조회 요청 보내기
                const resultResponse = await axios.post(`http://localhost:8085/member/total`, {
                    member_seq: userSeq,
                });
                console.log("BudgetReport 결과 : ", resultResponse.data);

                setTotalIncome(resultResponse.data.income_total_cost);
                setTotalExpense(resultResponse.data.budget_sum_cost);
            } catch (error) {
                console.error("데이터 조회 에러 : ", error);
            }
        };
        fetchTotalBudgetAndResult();
    }, [userSeq]);

    const fianlTotalBudget = totalBudget || 0; // 총 예산
    const fianlTotalIncome = totalIncome || 0; // 총 수입
    console.log("총수입꺼내옴:", fianlTotalIncome);
    const fianlTotalExpense = totalExpense || 0; //총 지출
    console.log("총지출꺼내옴:", fianlTotalExpense);
    // const balance = fianlTotalBudget + fianlTotalIncome - fianlTotalExpense; // 잔액

    return (
        // <div className="grid grid-cols-2 gap-4"> // 배열을 세로로 바꿈
        <div>

            <div className="rounded-md border shadow-md text-black bg-violet-100">
                <div className="text-lg font-bold text-black-500 m-3" style={{ textAlign: "center" }}>
                    수입 지출 그래프
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
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
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="text-lg font-bold text-black-500 mt-4 mx-3" style={{ textAlign: "center"}}>
                        웨딩 지출 통계 {" "}
                    </div>
                    <div className="text-xl font-bold mt-4 mx-3 text-[#8c6adb]" style={{ textAlign: "center" }}>
                        총 {expenses.length} 건
                    </div>
                </div>
                <div className="text-m text-gray-800 m-3" style={{ textAlign: "center" }}>
                    신랑 {broomPercentage.toFixed(0)}% | 신부 {bridePercentage.toFixed(0)}% | 공동{" "}
                    {bothPercentage.toFixed(0)}% | 기타 {etcPercentage.toFixed(0)}%{" "}
                </div>
                {/* <div className="text-xl text-gray-500 m-4">신부 {bridePercentage.toFixed(0)} %</div> */}
                {/* <div className="text-xl text-gray-500 m-4">공동 {bothPercentage.toFixed(0)}%   기타 {etcPercentage.toFixed(0)}%</div> */}
                {/* <div className="text-xl text-gray-500 m-4">기타 {etcPercentage.toFixed(0)} %</div> */}
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
