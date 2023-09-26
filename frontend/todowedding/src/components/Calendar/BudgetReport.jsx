import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

/*
 * 캘린더 하단 예산관리리포트
 * 작성자 : 서현록
 * 작성일 : 2023.09.16
 *  - 수정 : 총 예산 불러오기 마무리 (서현록, 2023.09.19)
 */

const BudgetReport = () => {
    const [totalBudget, setTotalBudget] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0); // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    // 총 예산/수입/지출 결과 불러오기
    useEffect(() => {
        const fetchTotalBudgetAndResult = async () => {
            try {
                // 백엔드로 총예산 조회 요청 보내기
                const budgetResponse = await axios.get(`http://172.30.1.9:8085/totalbudget/select/${userSeq}`);
                if (budgetResponse.data) {
                    setTotalBudget(budgetResponse.data.total_budget);
                    console.log("등록된 총 예산 : ", budgetResponse.data.total_budget);
                }

                // 백엔드로 수입/지출 결과 조회 요청 보내기
                const resultResponse = await axios.post(`http://172.30.1.9:8085/member/total`, {
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

    //숫자 세 자리 마다 콤마(,) 찍기
    const numberWithCommas = (x) => {
        return x.toLocaleString();
    };

    const fianlTotalBudget = totalBudget || 0; // 총 예산
    const fianlTotalIncome = totalIncome || 0; // 총 수입
    const fianlTotalExpense = totalExpense || 0; //총 지출
    const balance = fianlTotalBudget + fianlTotalIncome - fianlTotalExpense; // 잔액

    return (
        <div>
            <p className="mb-1 font-bold underline">잔액 : {numberWithCommas(balance)}원</p>
            <p className="mb-1">- 총 예산 : {numberWithCommas(fianlTotalBudget)}원</p>
            <p className="mb-1">- 총 수입 : {numberWithCommas(fianlTotalIncome)}원</p>
            <p className="mb-1">- 총 지출 : {numberWithCommas(fianlTotalExpense)}원</p>
        </div>
    );
};

export default BudgetReport;
