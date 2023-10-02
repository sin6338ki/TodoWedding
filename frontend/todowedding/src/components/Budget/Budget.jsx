import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { addComma } from "../utils/numberUtils";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/Budget.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* Budget 예산관리 : 총수입 , 총지출
 * 작성자 : 양수진
 * 작성일 : 2023.09.12
 * 로그인이전 home 으로 이동 (09.18)
 */

const Budget = (props) => {
    const [totalBalance, setTotalBalance] = useState(0); //결혼 준비 총예산
    const [totalIncome, setTotalIncome] = useState(0); // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출

    // 로그인 이전 Home 으로이동
    const nav = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const memberSeq = token ? token.userSeq : 0;

    useEffect(() => {
        findTotalBudget();
    }, [memberSeq, props.incomes, props.expenses]);

    //총지출, 총수입 조회
    const findTotalBudget = () => {
        if (!memberSeq) {
            nav("/");
        } else {
            const memberSeqObj = {
                member_seq: memberSeq,
            };

            axios
                .post(`${process.env.REACT_APP_API_URL}/member/total`, memberSeqObj)
                .then((response) => {
                    setTotalExpense(response.data.budget_sum_cost);
                    setTotalIncome(response.data.income_total_cost);
                    setTotalBalance(response.data.marry_total_budget);
                })
                .catch((error) => console.error("Error:", error));
        }
    };

    return (
        <div className="pocket__status">
            <div className="pocket__status-title"></div>

            <div className="pocket__status-detail">
                <div className="pocket__status-detail--desc">
                    <span className="fs-normal fw-light">총 수입</span>
                    <strong className="fs-emphasis fc-green">{addComma(totalIncome.toString())}원</strong>
                </div>
                <div className="pocket__status-detail--desc">
                    <span className="fs-normal fw-light">총 지출</span>
                    <strong className="fs-emphasis fc-red">{addComma(totalExpense.toString())}원</strong>
                </div>
            </div>
        </div>
    );
};

export default Budget;
