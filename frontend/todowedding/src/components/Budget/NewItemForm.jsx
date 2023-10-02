import React, { useState, useContext, useEffect } from "react";
import { StopEditContext } from "./NewItemContainer";
import "../../assets/budget-css/NewItemForm.css";
import axios from "axios";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

/*
 * 예산관리 페이지 (DB-insert)
 * - 수입 , 지출 입력 form 컴포넌트 분리
 * 디자인 radio 에서 btn 으로 수정 (09.22)
 * 예산관리 page expense 기본값으로 변경 (09.25)
 * 작성자 : 양수진
 * 작성일 : 2023.09.14
 */

const NewItemForm = () => {
    const { stopEditingHandler } = useContext(StopEditContext);

    //props - 수입
    const [incomeDt, setIncomeDt] = useState("");
    const [incomeContents, setIncomeContents] = useState("");
    const [incomeCost, setIncomeCost] = useState("");

    const [budgetDate, setBudgetDate] = useState("");
    const [budgetTitle, setBudgetTitle] = useState("");
    const [budgetCost, setBudgetCost] = useState("");
    const [enteredAmountType, setEnteredAmountType] = useState("expense");

    // 지출 항목 추가 input
    const [budgetRole, setBudgetRole] = useState("");
    const [budgetMemo, setBudgetMemo] = useState("");
    const [budgetExpenseCost, setBudgetExpenseCost] = useState("");

    const [enteredDate, setEnteredDate] = useState("");

    // 내역추가 지출-수입 버튼 색상 변경 (09.25)
    useEffect(() => {
        if (enteredAmountType === "expense") {
            document.getElementById("expense").style.setProperty("background-color", "#9f7ffc");
            document.getElementById("expense").style.setProperty("color", "#FFFFFF");
            document.getElementById("income").style.setProperty("background-color", "rgb(223 223 223)");
            document.getElementById("income").style.setProperty("color", "#000000");
        } else if (enteredAmountType === "income") {
            document.getElementById("expense").style.setProperty("background-color", "rgb(223 223 223)");
            document.getElementById("expense").style.setProperty("color", "#000000");
            document.getElementById("income").style.setProperty("background-color", "#9f7ffc");
            document.getElementById("income").style.setProperty("color", "#FFFFFF");
        } else {
            // 아무것도 선택안했을때
            document.getElementById("expense").style.setProperty("background-color", "#9f7ffc");
            document.getElementById("expense").style.setProperty("color", "#FFFFFF");
            document.getElementById("income").style.setProperty("background-color", "#9f7ffc");
            document.getElementById("income").style.setProperty("color", "#FFFFFF");
        }
    }, [enteredAmountType]);

    // 수입 데이터 보내줄 때
    const [incomeData, setIncomeData] = useState({});

    // 지출 데이터 보내줄 때 (09.14)
    const [newBudgetData, setNewBudgetData] = useState({});

    // 수입 데이터 입력 + 지출 데이터 DB입력 (insert)
    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredAmountType === "income") {
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/income/insert`,
                    incomeData // useState 훅으로 생성된 상태 사용
                )
                .then((response) => {
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
            axios
                .post(`${process.env.REACT_APP_API_URL}/budget/insert`, newBudgetData)
                .then((response) => {
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
                <div className="amount__expense">
                    <button
                        type="button"
                        id="expense"
                        className={`amount__expense ${enteredAmountType === "expense" ? "active" : ""}`}
                        onClick={() => setEnteredAmountType("expense")}
                        style={{
                            backgroundColor: "#9f7ffc",
                            borderRadius: "10px",
                            padding: "7% 30% 7% 30%",
                            color: "#ffffff",
                            border: "none",
                            width: "160px",
                            marginRight: "2%",
                            marginBottom: "20px",
                        }}
                    >
                        지출
                    </button>
                </div>
                <div className="amount__income">
                    <button
                        type="button"
                        id="income"
                        className={`amount__income ${enteredAmountType === "income" ? "active" : ""}`}
                        onClick={() => setEnteredAmountType("income")}
                        style={{
                            backgroundColor: "#9f7ffc",
                            borderRadius: "10px",
                            padding: "7% 30% 7% 30%",
                            color: "#ffffff",
                            border: "none",
                            width: "160px",
                            marginLeft: "2%",
                            marginBottom: "20px",
                        }}
                    >
                        수입
                    </button>
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
                    style={{
                        marginTop: "5%",
                        marginBottom: "10%",
                        border: "1px solid #9F7FFC",
                        color: "#FFFFFF",
                        backgroundColor: "#9F7FFC",
                        padding: "7px 13px 7px 13px",
                        borderRadius: "10px",
                    }}
                >
                    등록
                </button>
                <button
                    type="button"
                    className="btn-white"
                    onClick={stopEditingHandler}
                    style={{
                        marginTop: "5%",
                        marginBottom: "10%",
                        border: "1px solid #5E5459",
                        padding: "7px 13px 7px 13px",
                        borderRadius: "10px",
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default NewItemForm;
