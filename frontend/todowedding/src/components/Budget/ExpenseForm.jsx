

/* Budget 예산 지출 입력 (내역추가)
 * 수정 : Date 미래 날짜도 기입할 수 있도록 코드 수정 (09.26)
 * 작성자 : 양수진
 * 작성일 : 2023.09.15
 */


import React, { useContext, useState, useCallback, useEffect } from 'react';
import { ItemDispatchContext } from '../Budget/BudgetApp';
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";
import { StopEditContext } from '../Budget/NewItemContainer';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ExpenseForm = ({newBudgetData, budgetDate, setBudgetDate,  budgetTitle, setBudgetTitle, budgetCost, setBudgetCost, budgetRole, setBudgetRole, budgetMemo, setBudgetMemo, budgetExpenseCost,setBudgetExpenseCost,  setNewBudgetData}) => {


    const token = useSelector((state) => state.Auth.token);
    let memberSeq;
        if (token && token.userSeq) {
            memberSeq = token.userSeq;
        } else {
            console.error('Token or user sequence is not defined.');
            memberSeq = 0; // or set it to a fallback value if necessary
        }



    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);
    const roles =["분담을 선택해주세요","신랑", "신부", "공동", "기타"]; 

    const TITLE_SIZE = 35;

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);

    // 날짜
    const dateChangeHandler = (event) => {
        console.log("날짜 입력", event.target.value)
        setBudgetDate(event.target.value);
    };

    // 제목
    const titleChangeHandler = (event) => {
        console.log("제목 입력 :" , event.target.value);
        let isSizeOver = event.target.value.length > TITLE_SIZE ? true : false;
        setIsTitleSizeOver(isSizeOver);

        setBudgetTitle(event.target.value);
    };

    // 금액
    const amountChangeHandler = (event) => {
        let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value) ? true : false;
        setIsEnteredWrongAmount(isNotNumber);
        if (isNotNumber) return;

        let amount = addComma(enteredOnlyNumber(event.target.value));
        setBudgetCost(amount);
    };

    // //수입 인지 지출인지 type확인 
    // const amountTypeChangeHandler = (event) => {
    //     setEnteredAmountType(event.target.value);
    // };

    //               --- 추가 input ---  
    // 예상지출 
    const budgetCostChangeHandler = (event) => {
        console.log("예상지출 입력", event.target.value)
        setBudgetExpenseCost(event.target.value);
    };
    // 비용분담
    const budgetRoleChangeHandler = (event) => {
        console.log("비용분담 입력", event.target.value)
        setBudgetRole(event.target.value);
    };
    // 비고 (메모)
    const budgetMemoChangeHandler = (event) => {
        console.log("비고 입력", event.target.value)
        setBudgetMemo(event.target.value);
    };


  
    


      // 지출 데이터 보내줄 때 (동기,비동기통신)
      useEffect(()=>{
          setNewBudgetData({
            budget_item : budgetTitle,
            budget_expense_dt : budgetDate,
            budget_cost : deleteComma(budgetCost).toString(),
            budget_role : budgetRole,
            budget_memo : budgetMemo,
            budget_expense_cost : deleteComma(budgetExpenseCost).toString(),
            member_seq : memberSeq // 여기부분 수정하기 
          });

    // stopEditingHandler();   
      },[budgetDate,budgetCost,budgetTitle,budgetRole,budgetMemo,budgetExpenseCost,memberSeq]); // memberSeq추가
    



  return (
    <div>

          {/* 날짜 */}
             <div className="new-item__form-info">
                <h1 className="fs-normal fw-bold text-base font-extrabold">날짜</h1>
                <input
                    type="date"
                    name='budget_Date'
                    value={budgetDate}
                    onChange={dateChangeHandler}
                    min="2020-01-01"
                    // max={getDate()}   
                    required
                    style={{marginTop:'-25px'}}
                />
            </div>

            {/* 내용 */}
            <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h2 className="fs-normal fw-bold text-base font-extrabold">제목</h2>
                    <span className="fs-tiny ft-alert" style={{ display: isTitleSizeOver ? "inline-block" : "none" }}>
                        {TITLE_SIZE}자까지만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type="text"
                    value={budgetTitle}
                    name='budget_title'
                    onChange={titleChangeHandler}
                    placeholder="사용 내역을 입력해주세요."
                    maxLength={TITLE_SIZE}
                    required
                />
            </div>

           {/* 금액 */}
             <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h2 className="fs-normal fw-bold text-base font-extrabold">금액</h2>
                    <span
                        className="fs-tiny ft-alert"
                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                    >
                        10억 미만의 정수만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type="text"
                    value={budgetCost}
                    name="budget_cost"
                    onChange={amountChangeHandler}
                    placeholder="금액을 입력해주세요."
                    maxLength="11"
                    required
                />
            </div>

                    
         {/* ---여기부터가 지출 input추가---   */}
                {/* 예상비용 */}
             <div className='new-item__form-info'>
                    <div className='new-item__form-info--title'>
                     <h2 className="fs-normal fw-bold text-base font-extrabold">예상 비용</h2>
                          <span
                               className="fs-tiny ft-alert"
                               style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                           >
                                    예상비용을 적어주세요 .
                           </span>
                     </div>
                      <input
                        type="text"
                        value={budgetExpenseCost}
                        name='buddget_expenstcost'
                        onChange={budgetCostChangeHandler}
                        placeholder="예상비용을 입력해주세요"
                        maxLength={TITLE_SIZE}
                        required
                    />
             </div>


                  {/* 분담 */}
            <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h3 className="fs-normal fw-bold text-base font-extrabold">분담</h3>
                </div>
                <select 
                    value={budgetRole}
                    onChange={budgetRoleChangeHandler} 
                    style={{ border: "1px solid #D9D9D9", padding: '6px 9px', borderRadius:'5px' ,color:'darkgray'}}
                >
                    {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                    ))}
                </select>
            </div>
                  
                   {/* 비고 */}
             <div className="new-item__form-info">
                    <div className="new-item__form-info--title">
                            <h2 className="fs-normal fw-bold text-base font-extrabold">비고</h2>
                            <span
                                className="fs-tiny ft-alert"
                                style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                            >
                                메모.
                            </span>
                    </div>
                     <input
                        type="text"
                        value={budgetMemo}
                        name='budget_memo'
                        onChange={budgetMemoChangeHandler}
                        placeholder="지출 메모를 작성해주세요"
                        maxLength={TITLE_SIZE}
                        required
                      />
            </div>
     
       </div>
          
    
  )
}

export default ExpenseForm