

import React, { useCallback, useState, useContext, useEffect } from "react";
import { ItemDispatchContext } from "./BudgetApp";
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";
import { StopEditContext } from "./NewItemContainer";
const IncomeForm = ({ enteredDate, setIncomeData, budgetCost, enteredTitle, incomeDt, setIncomeDt, incomeContents, setIncomeContents, incomeCost, setIncomeCost }) => {

    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

    const TITLE_SIZE = 35;

    // const [incomeDt, setIncomeDt] = useState("");
    // const [incomeContents, setIncomeContents] = useState("");
    // const [incomeCost, setIncomeCost] = useState("");
    const [enteredAmountType, setEnteredAmountType] = useState("income");

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);

    // 날짜
    const dateChangeHandler = (event) => {
        console.log("날짜 입력", event.target.value)
        setIncomeDt(event.target.value);
    };

    // 제목
    const titleChangeHandler = (event) => {
        console.log("제목 입력 :" , event.target.value);
        let isSizeOver = event.target.value.length > TITLE_SIZE ? true : false;
        setIsTitleSizeOver(isSizeOver);

        setIncomeContents(event.target.value);
    };

    // 금액
    const amountChangeHandler = (event) => {
        let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value) ? true : false;
        setIsEnteredWrongAmount(isNotNumber);
        if (isNotNumber) return;

        let amount = addComma(enteredOnlyNumber(event.target.value));
        setIncomeCost(amount);
    };

    // 수입 데이터 보내줄 때
    useEffect(()=>{
      const incomeData = {
        income_dt : incomeDt,
        income_cost :deleteComma(incomeCost).toString() ,
        income_contents : incomeContents,
        member_seq : 101
      }

    setIncomeData(incomeData);

// 입력창 초기화
// setIncomeDt("");
// setIncomeContents("");
// setIncomeCost("");
// setEnteredAmountType("income");

// stopEditingHandler();
  }, [incomeDt, incomeCost, incomeContents]);

  return (
    <div>
     {/* 내역추가(날짜) */}
     <div className="new-item__form-info">
                <h2 className="fs-normal fw-regular">날짜</h2>
                <input
                    type="date"
                    name="income_dt"
                    value={incomeDt}
                    onChange={(e)=>{dateChangeHandler(e)}}
                    min="2020-01-01"
                    max={getDate()}
                    required
                />
            </div>
        {/* 내용 */}
            <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h2 className="fs-normal fw-regular">제목</h2>
                    <span className="fs-tiny ft-alert" style={{ display: isTitleSizeOver ? "inline-block" : "none" }}>
                        {TITLE_SIZE}자까지만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type="text"
                    value={incomeContents}
                    name="income_contents"
                    onChange={titleChangeHandler}
                    placeholder="사용 내역을 입력해주세요."
                    maxLength={TITLE_SIZE}
                    required
                />
            </div>
        {/* 금액 */}
            <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h2 className="fs-normal fw-regular">금액</h2>
                    <span
                        className="fs-tiny ft-alert"
                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                    >
                        10억 미만의 정수만 입력할 수 있어요.
                    </span>
                </div>

                <input
                    type="text"
                    value={incomeCost}
                    name="income_cost"
                    onChange={amountChangeHandler}
                    placeholder="금액을 입력해주세요."
                    maxLength="11"
                    required
                />
            </div>
    </div>
  )
};

export default IncomeForm