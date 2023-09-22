import React, { useCallback, useState, useContext } from "react";
import { ItemDispatchContext } from "./BudgetApp";
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";
import { StopEditContext } from "./NewItemContainer";
import "../../assets/budget-css/NewItemForm.css";
import axios from "axios";
import { useSelector } from "react-redux";

import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

/*
 * 예산관리 페이지 (DB-insert)
 * - 수입 , 지출 입력 form 컴포넌트 분리
 * 작성자 : 양수진
 * 작성일 : 2023.09.14
 */

const NewItemForm = () => {
    const token = useSelector((state) => state.Auth.token);
    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

    //props - 수입
    const [incomeDt, setIncomeDt] = useState("");
    const [incomeContents, setIncomeContents] = useState("");
    const [incomeCost, setIncomeCost] = useState("");

    const TITLE_SIZE = 35;

    const [budgetDate, setBudgetDate] = useState("");
    const [budgetTitle, setBudgetTitle] = useState("");
    const [budgetCost, setBudgetCost] = useState("");
    const [enteredAmountType, setEnteredAmountType] = useState("income");

    // 지출 항목 추가 input
    const [budgetRole, setBudgetRole] = useState("");
    const [budgetMemo, setBudgetMemo] = useState("");
    const [budgetExpenseCost, setBudgetExpenseCost] = useState("");

    const [enteredDate, setEnteredDate] = useState("");

    // 날짜를 문자열로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함.
        const day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    };

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);

    // 수입 인지 지출인지 type확인
    const amountTypeChangeHandler = (event) => {
        setEnteredAmountType(event.target.value);
    };

    // back에서 BudgetDto에 맞춰 값 넣어주기 -->9/13 수정
    //   const enteredData = {
    //     id: nextItemId,
    //     budget_expense_dt: formatDate(new Date(enteredDate)),
    //     budget_item: enteredTitle,
    //     budget_cost: deleteComma(budgetCost),
    //     amountType: enteredAmountType, //수입인지 지출인지 구분 type
    //    };

    // 수입 데이터 보내줄 때
    const [incomeData, setIncomeData] = useState({});

    // 지출 데이터 보내줄 때 (09.14)
    const [newBudgetData, setNewBudgetData] = useState({});

    // 수입 데이터 입력 + 지출 데이터 DB입력 (insert)
    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredAmountType === "income") {
            console.log("수입 선택", incomeData);
            axios
                .post(
                    `http://172.30.1.7:8085/income/insert`,
                    incomeData // useState 훅으로 생성된 상태 사용
                )

                .then((response) => {
                    console.log("Data insert 확인 : ", incomeData);
                    console.log("수입날짜입력콘솔찍기", response);

                    if (response.status == 200) {
                        // 수입 입력창 초기화
                        setIncomeDt("");
                        setIncomeContents("");
                        setIncomeCost("");
                        setEnteredAmountType("income");
                        location.reload();
                    }
                })
                .catch((error) => {
                    console.error("지출 budget error!", error);
                });
        } else {
            console.log("지출 선택", newBudgetData);
            axios
                .post(
                    `http://172.30.1.7:8085/budget/insert`,
                    newBudgetData // useState 훅으로 생성된 상태 사용
                )
                .then((response) => {
                    console.log("Data insert 확인 : ", newBudgetData);
                    console.log("지출날짜입력콘솔찍기", response);

                    if (response.status == 200) {
                        // 지출 입력창 초기화
                        setBudgetDate("");
                        setBudgetTitle("");
                        setBudgetCost("");
                        setBudgetExpenseCost("");
                        setBudgetRole("");
                        setBudgetMemo("");
                        location.reload();
                    }
                })
                .catch((error) => {
                    console.error("지출 budget error!", error);
                });
        }
    };

    return (
        <div className="new-item__form">
            {/* 수입인지 지출인지 체크  */}
            <div className="amount__type">
                <div className="amount__income">
                    <input
                        type="radio"
                        id="income"
                        name="amount-type"
                        value="income"
                        onChange={amountTypeChangeHandler}
                        checked={enteredAmountType === "income"}
                        required
                    />
                    <label htmlFor="income" className="fs-small">
                        수입
                    </label>
                </div>

                <div className="amount__expense">
                    <input
                        type="radio"
                        id="expense"
                        name="amount-type"
                        value="expense"
                        onChange={amountTypeChangeHandler}
                        checked={enteredAmountType === "expense"}
                        required
                    />
                    <label htmlFor="expense" className="fs-small">
                        지출
                    </label>
                </div>
            </div>

            {/* 무한루프 */}
            {enteredAmountType === "income" && (
                <IncomeForm
                    enteredDate={enteredDate}
                    // enteredTitle={enteredTitle}
                    budgetCost={budgetCost}
                    setIncomeData={setIncomeData}
                    incomeDt={incomeDt}
                    setIncomeDt={setIncomeDt}
                    incomeContents={incomeContents}
                    setIncomeContents={setIncomeContents}
                    incomeCost={incomeCost}
                    setIncomeCost={setIncomeCost}
                />
            )}
            {enteredAmountType === "expense" && (
                <ExpenseForm
                    enteredDate={enteredDate}
                    // enteredTitle={enteredTitle}
                    budgetCost={budgetCost}
                    setNewBudgetData={setNewBudgetData}
                    budgetDate={budgetDate}
                    setBudgetDate={setBudgetDate}
                    budgetTitle={budgetTitle}
                    setBudgetTitle={setBudgetTitle}
                    setBudgetCost={setBudgetCost}
                    budgetExpenseCost={budgetExpenseCost}
                    setBudgetExpenseCost={setBudgetExpenseCost}
                    budgetRole={budgetRole}
                    setBudgetRole={setBudgetRole}
                    budgetMemo={budgetMemo}
                    setBudgetMemo={setBudgetMemo}
                    newBudgetData={newBudgetData}
                />
            )}

            {/* 등록_취소 */}
            <div className="new-item__form-actions">
                <button
                    type="button"
                    onClick={(e) => {
                        submitHandler(e);
                    }}
                    className="btn-purple"
                >
                    등록
                </button>
                <button type="button" className="btn-white" onClick={stopEditingHandler}>
                    취소
                </button>
            </div>
        </div>
    );
};

export default NewItemForm;
