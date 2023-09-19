/**
 * 예산관리 수입 & 지출 list 페이지
 * 작성자 : 양수진
 * 작성일 : 2023.09.18
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";

const BudgetIndex = () => {
    // AdminPage_index 참조

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // 지출조회
        axios
            .post("http://localhost:8085/budget/select", {
                member_seq: 101, // memberSeq로 값 변경하기
            })
            .then((res) => {
                console.log("지출 전체 조회 : ", res.data);
                setExpenses(res.data);
            })
            .catch((err) => {
                console.log("지출 전체 조회 에러 : ", err);
            });
    }, []);

    useEffect(() => {
        // 수입조회
        axios
            .post("http://localhost:8085/income/select", {
                member_seq: 101,
            })
            .then((res) => {
                console.log("수입 전체 조회 :", res.data);
                setIncomes(res.data);
            })
            .catch((err) => {
                console.log("수입 전체 조회 에러 :", err);
            });
    }, []);

    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 mt-1 text-[#A383FF]">
                <Tab eventKey="income" title="수입 리스트">
                    <IncomeList incomes={incomes} />
                </Tab>
                <Tab eventKey="budget" title="지출 리스트">
                    <ExpenseList expenses={expenses} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default BudgetIndex;
