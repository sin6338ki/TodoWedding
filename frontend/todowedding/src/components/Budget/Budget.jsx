import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { addComma } from "../utils/numberUtils";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/Budget.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Budget 예산관리
 * 작성자 : 양수진
 * 작성일 : 2023.09.12
 */

//PocketStatus
const Budget = (props) => {

  //userSeq 받아오기
const token = useSelector((state) => state.Auth.token);
const memberSeq = token.userSeq;


    const { filteredItems, filterBaseYear } = useContext(FilterContext);

    const [totalBalance, setTotalBalance] = useState(0); //결혼 준비 총예산 --> 어디서 가져와야할까 ? 
    const [totalIncome, setTotalIncome] = useState(0);   // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출
    const twoDigitYear = filterBaseYear.slice(-2);

    // useEffect(() => { // 기존코드 참고용 --> 삭제 X 
    //     let total = { balance: 0, income: 0, expense: 0 };

    //     if (filteredItems.length > 0) {
    //         // 자산, 수입, 지출 합계 계산
    //         filteredItems.forEach((item) => {
    //             if (item.type === "income") {
                   
    //                 total.balance += +item.amount;
    //                 total.income += +item.amount;
    //             } else if (item.type === "expense") {
                   
    //                 total.balance -= +item.amount;
    //                 total.expense += +item.amount; 
    //             }
    //         });

    //         setTotalBalance(total.balance);
    //         setTotalIncome(total.income);
    //         setTotalExpense(total.expense);
    //     }
    // }, [filteredItems]);

    // 총예산 - 총수입 - 총지출 불러오기 
    useEffect (()=>{
        const memberSeq = {
            "member_seq" : 101 // kakao-seq 로 바꿔주기 ! -->${memberSeq}로 바꾸기
        };

        axios.post(`http://localhost:8085/member/total`,memberSeq)
        .then(response => {
            console.log("222",response);
            setTotalExpense(response.data.budget_sum_cost);
            setTotalIncome(response.data.income_total_cost);
            setTotalBalance(response.data.marry_total_budget);
        })
        .catch(error => console.error('Error:', error));  
    },[])






    return (
        <div className="pocket__status">
            <div className="pocket__status-title">
                <h1 className="fs-normal fw-light">{twoDigitYear}년 웨딩예산관리</h1>
                <strong className="fs-title">웨딩 전체 예산 : {addComma(totalBalance.toString())}원</strong>
            </div>

            <div className="pocket__status-detail">
                <div className="pocket__status-detail--desc">
                    <span className="fs-normal fw-light">총수입</span>
                    <strong className="fs-emphasis fc-green">{addComma(totalIncome.toString())}원</strong>
                </div>
                <div className="pocket__status-detail--desc">
                    <span className="fs-normal fw-light">총지출</span>
                    <strong className="fs-emphasis fc-red">{addComma(totalExpense.toString())}원</strong>
                </div>
            </div>
        </div>
    );
};

export default Budget;
