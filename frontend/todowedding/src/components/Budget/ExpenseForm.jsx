import React, { useContext, useState, useCallback, useEffect } from 'react';
import { ItemDispatchContext } from '../Budget/BudgetApp';
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";
import { StopEditContext } from '../Budget/NewItemContainer';

const ExpenseForm = ({newBudgetData, budgetDate, setBudgetDate,  budgetTitle, setBudgetTitle, budgetCost, setBudgetCost, budgetRole, setBudgetRole, budgetMemo, setBudgetMemo, budgetExpenseCost,setBudgetExpenseCost,  setNewBudgetData}) => {

    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

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
            member_seq : 101
          });

    // stopEditingHandler();   
      },[budgetDate,budgetCost,budgetTitle,budgetRole,budgetMemo,budgetExpenseCost]);
    
  

    // // 수입 데이터 입력 + 지출 데이터 DB입력 (insert) 
    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     if(enteredAmountType === 'income'){
    //         console.log("수입 선택");
    //         axios.post(`http://localhost:8085/income/insert`,incomeData)
    //         .then(response => {
    //             console.log("Data insert 확인 : ", incomeData);
    //             console.log('수입날짜입력콘솔찍기', response);
    //         })
    //         .catch(error => {
    //             console.error('지출 budget error!', error);
    //         })
    //     }else{
    //         console.log("지출 선택");
    //         axios.post(`http://localhost:8085/budget/insert`,budgetData )
    //         .then(response => {
    //             console.log("Data insert 확인 : ", budgetData);
    //             console.log('지출날짜입력콘솔찍기', response);
    //         })
    //         .catch(error => {
    //             console.error('지출 budget error!', error);
    //         })
    //     }

    //     event.preventDefault();

      




    // backend 데이터 전송 (지출)
    // axios.post('http://localhost:8085/budget/insert', budgetData)
    // .then(response => {
    //     console.log("Data insert 확인 : ", budgetData);
    //     console.log('지출날짜입력콘솔찍기', response);
    // })
    // .catch(error => {
    //     console.error('지출 budget error!', error);
    // });


    // //    // backend 데이터 전송 (수입)
    // //    axios.post('http://localhost:8085/income/insert', incomeData)
    // //    .then(response => {
    // //        console.log("Data insert 확인 : ", incomeData);
    // //        console.log('수입날짜입력콘솔찍기', response);
    // //    })
    // //    .catch(error => {
    // //        console.error('income budget error!', error);
    // //    });




    //     onAdd(enteredData); // 부모 컴포넌트로 enteredData 전달

    //     // 입력창 초기화
    //     setBudgetDate("");
    //     setBudgetTitle("");
    //     setBudgetCost("");
    //     setEnteredAmountType("income");

    //     stopEditingHandler();
    // };










  return (
    <div>

          {/* 내역추가(날짜) */}
             <div className="new-item__form-info">
                <h2 className="fs-normal fw-regular">날짜</h2>
                <input
                    type="date"
                    name='budget_Date'
                    value={budgetDate}
                    onChange={dateChangeHandler}
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
                     <h2 className="fs-normal fw-regular">예상 비용</h2>
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
                                <h3 className="fs-normal fw-regular">분담</h3>
                                    <span
                                        className="fs-tiny ft-alert"
                                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                                    >
                                        비용분담한 사람을 적어주세요.
                                    </span>
                            </div>
                            <input
                            type="text"
                            value={budgetRole}
                            name='budget_role'
                            onChange={budgetRoleChangeHandler}
                            placeholder="비용분담자를 입력해주세요 (ex.신부)"
                            maxLength={TITLE_SIZE}
                            required
                            />
            </div>
                  
                   {/* 비고 */}
             <div className="new-item__form-info">
                    <div className="new-item__form-info--title">
                            <h2 className="fs-normal fw-regular">비고</h2>
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
                        placeholder="비고."
                        maxLength={TITLE_SIZE}
                        required
                      />
            </div>
     
       </div>
          
    
  )
}

export default ExpenseForm