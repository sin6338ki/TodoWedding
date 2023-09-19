import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { addComma } from "../utils/numberUtils";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/Budget.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* Budget 예산관리
 * 작성자 : 양수진
 * 작성일 : 2023.09.12
 * 로그인이전 home 으로 이동 (09.18)
 */

//PocketStatus (상위컴포넌트) --> 입력하면 바로렌더링 하는 부분 수정필요
const Budget = (props) => {
    const { filteredItems, filterBaseYear } = useContext(FilterContext);
    const [totalBalance, setTotalBalance] = useState(0); //결혼 준비 총예산 --> 어디서 가져와야할까 ?
    const [totalIncome, setTotalIncome] = useState(0); // 총수입
    const [totalExpense, setTotalExpense] = useState(0); // 총지출
    const twoDigitYear = filterBaseYear.slice(-2);

    // 로그인 이전 Home 으로이동
    const nav = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const [memberSeq, setMemberSeq] = useState();

    useEffect(() => {
        if (token && token.userSeq) {
            console.log("token, ", token);
            setMemberSeq(token.userSeq);
        } else {
            console.error("Token or user sequence is not defined.");
            setMemberSeq(0); // or set it to a fallback value if necessary
        }
    }, [token]);

    useEffect(() => {
        if (!token) {
            alert("로그인 후 진행해 주세요");
            nav("/");
        } else {
            const memberSeqObj = {
                member_seq: memberSeq,
            };

            axios
                .post(`http://localhost:8085/member/total`, memberSeqObj)
                .then((response) => {
                    console.log("222", response);
                    setTotalExpense(response.data.budget_sum_cost);
                    setTotalIncome(response.data.income_total_cost);
                    setTotalBalance(response.data.marry_total_budget);
                })
                .catch((error) => console.error("Error:", error));
        }
    }, [memberSeq]);

    //전체 총수입 총지출 조회 메서드 (postman에서 selectTotal참고)
    // const fetchData = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:8085/member/total`);
    //         console.log("budget 조회 response : ", res.data.income_total_cost);
    //         setTotalIncome(res.data);
    //     } catch (error) {
    //         console.error("Error", error);
    //     }
    // };

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
