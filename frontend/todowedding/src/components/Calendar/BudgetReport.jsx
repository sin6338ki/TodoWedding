import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

/*
 * 캘린더 하단 예산관리리포트
 * 작성자 : 서현록
 * 작성일 : 2023.09.16
 */

const BudgetReport = () => {
    const [totalBudget, setTotalBudget] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0); // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    // 총 예산, 총 수입, 총 지출 결과 불러오기
    useEffect(() => {
        axios
            .post(`http://172.30.1.7:8085/member/total`, { member_seq: userSeq })
            .then((response) => {
                console.log("BudgetReport 결과 : ", response.data);
                setTotalIncome(response.data.income_total_cost);
                setTotalExpense(response.data.budget_sum_cost);
            })
            .catch((error) => console.log("총 예산 불러오기 에러 : ", error));
    }, [userSeq]);

    return (
        <div>
            <p className="mb-1">현재 잔액 : {totalBudget + totalIncome - totalExpense}원</p>
            <p className="mb-1">- 총 예산 : {totalBudget}원</p>
            <p className="mb-1">- 총 수입 : {totalIncome}원</p>
            <p className="mb-1">- 총 지출 : {totalExpense}원</p>
        </div>
    );
};

export default BudgetReport;
