/**
 * 예산관리 통계 & 수입 & 지출 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import BudgetDashboard from "./BudgetDashboard";

const BudgetIndex = ({ incomes, setIncomes, expenses, setExpenses }) => {
    const token = useSelector((state) => state.Auth.token);

    // chart정보
    const [brideCnt, setBrideCnt] = useState(0);
    const [broomCnt, setBroomCnt] = useState(0);
    const [bothCnt, setBothCnt] = useState(0);
    const [etcCnt, setEtcCnt] = useState(0);

    /**
     * 지영 수정 부분 : 삭제 처리 시 바로 화면에 적용!
     */
    useEffect(() => {
        token && findIncomes();
        token && findExpenses();
    }, []);

    //수입 조회 메서드
    const findIncomes = () => {
        // 수입조회
        axios
            .post(`${process.env.REACT_APP_API_URL}/income/select`, {
                member_seq: token.userSeq,
            })
            .then((res) => {
                setIncomes(res.data);
            })
            .catch((err) => {
                console.log("수입 전체 조회 에러 :", err);
            });
    };

    //지출 조회 메서드
    const findExpenses = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/budget/select`, {
                member_seq: token.userSeq, // memberSeq로 값 변경하기
            })
            .then((res) => {
                setExpenses(res.data);
            })
            .catch((err) => {
                console.log("지출 전체 조회 에러 : ", err);
            });
    };

    // ================================================================

    // 분담 조회 (신부-신랑-공동-기타)
    const chartRole = () => {
        let bride = 0; //신부
        let broom = 0; //신랑
        let both = 0; //공동
        let etc = 0; //기타
        expenses.forEach((expense) => {
            if (expense.budget_role === "신부") {
                bride++;
            } else if (expense.budget_role === "신랑") {
                broom++;
            } else if (expense.budget_role === "공동") {
                both++;
            } else {
                etc++;
            }
        });
        setBrideCnt(bride);
        setBroomCnt(broom);
        setBothCnt(both);
        setEtcCnt(etc);
    };

    // 분담 정보 불러왔을 때 chart 이벤트 실행
    useEffect(() => {
        chartRole();
    }, [expenses]);

    return (
        <div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="budget-tabs">
                <Tab eventKey="home" title="통계">
                    <BudgetDashboard
                        incomes={incomes}
                        expenses={expenses}
                        brideCnt={brideCnt}
                        broomCnt={broomCnt}
                        bothCnt={bothCnt}
                        etcCnt={etcCnt}
                    />
                </Tab>
                <Tab eventKey="budget" title="지출 리스트">
                    <ExpenseList expenses={expenses} findExpenses={findExpenses} />
                </Tab>
                <Tab eventKey="income" title="수입 리스트">
                    <IncomeList incomes={incomes} findIncomes={findIncomes} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default BudgetIndex;
