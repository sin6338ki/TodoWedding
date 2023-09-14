import React, { useContext, useState, useCallback } from 'react';
import { ItemDispatchContext } from '../Budget/BudgetApp';
import { StopEditContext } from '../Budget/NewItemContainer';
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";

const ExpenseForm = () => {


    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

    const TITLE_SIZE = 35;

    const [enteredDate, setEnteredDate] = useState("");
    const [enteredTitle, setEnteredTitle] = useState("");
    const [budgetCost, setBudgetCost] = useState("");
    const [enteredAmountType, setEnteredAmountType] = useState("income");
      // 지출 항목 추가 input
    const [budgetRole, setBudgetRole] = useState("");
    const [budgetMemo, setBudgetMemo] = useState("");
    const [budgetExpenseCost,setBudgetExpenseCost] = useState("")


    // 날짜를 문자열로 변환하는 함수
        const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함.
        const day = ('0' + date.getDate()).slice(-2);
    
        return `${year}-${month}-${day}`;
    }

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);

    

    // 날짜
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const titleChangeHandler = (event) => {
        let isSizeOver = event.target.value.length > TITLE_SIZE ? true : false;
        setIsTitleSizeOver(isSizeOver);

        setEnteredTitle(event.target.value);
    };

    // 금액
    const amountChangeHandler = (event) => {
        let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value) ? true : false;
        setIsEnteredWrongAmount(isNotNumber);
        if (isNotNumber) return;

        let amount = addComma(enteredOnlyNumber(event.target.value));
        setBudgetCost(amount);
    };

    // 수입 인지 지출인지 type확인 
    const amountTypeChangeHandler = (event) => {
        setEnteredAmountType(event.target.value);
    };

    // 예상지출 
    const budgetCostChangeHandler = (event) => {
        setBudgetExpenseCost(event.target.value);
    };
    // 비용분담
    const budgetRoleChangeHandler = (event) => {
        setBudgetRole(event.target.value);
    };
    // 비고 (메모)
    const budgetMemoChangeHandler = (event) => {
        setBudgetMemo(event.target.value);
    };

     // back에서 BudgetDto에 맞춰 값 넣어주기 -->9/13 수정 
    //  const enteredData = {     
    //     id: nextItemId,
    //     budget_expense_dt: formatDate(new Date(enteredDate)),  //new Date(enteredDate)
    //     budget_item: enteredTitle,
    //     budget_cost: deleteComma(budgetCost),
    //     amountType: enteredAmountType, //수입인지 지출인지 구분 type
    //    };
    //    console.log(enteredData);


    // 수입 데이터 보내줄 때
      const incomeData = {
        income_dt : formatDate(new Date(enteredDate)),
        income_cost :deleteComma(budgetCost) ,
        income_contents : enteredTitle,
        member_seq : 101
      }

      // 지출 데이터 보내줄 때 
      const budgetData = {
        budget_item : enteredTitle,
        budget_expense_dt : formatDate(new Date(enteredDate)), //문자열로 바꿔서 Date 보내주기로 수정
        budget_cost : deleteComma(budgetCost),
        budget_role : budgetRole,
        budget_memo : budgetMemo,
        budget_expense_cost : deleteComma(budgetExpenseCost),
        member_seq : 101
      }


    // 수입 데이터 입력 + 지출 데이터 DB입력 (insert) 
    const submitHandler = (event) => {
        event.preventDefault();

        if(enteredAmountType === 'income'){
            console.log("수입 선택");
            axios.post(`http://localhost:8085/income/insert`,incomeData)
            .then(response => {
                console.log("Data insert 확인 : ", incomeData);
                console.log('수입날짜입력콘솔찍기', response);
            })
            .catch(error => {
                console.error('지출 budget error!', error);
            })
        }else{
            console.log("지출 선택");
            axios.post(`http://localhost:8085/budget/insert`,budgetData )
            .then(response => {
                console.log("Data insert 확인 : ", budgetData);
                console.log('지출날짜입력콘솔찍기', response);
            })
            .catch(error => {
                console.error('지출 budget error!', error);
            })
        }

        event.preventDefault();

      




    // backend 데이터 전송 (지출)
    axios.post('http://localhost:8085/budget/insert', budgetData)
    .then(response => {
        console.log("Data insert 확인 : ", budgetData);
        console.log('지출날짜입력콘솔찍기', response);
    })
    .catch(error => {
        console.error('지출 budget error!', error);
    });


    //    // backend 데이터 전송 (수입)
    //    axios.post('http://localhost:8085/income/insert', incomeData)
    //    .then(response => {
    //        console.log("Data insert 확인 : ", incomeData);
    //        console.log('수입날짜입력콘솔찍기', response);
    //    })
    //    .catch(error => {
    //        console.error('income budget error!', error);
    //    });




        onAdd(enteredData); // 부모 컴포넌트로 enteredData 전달

        // 입력창 초기화
        setEnteredDate("");
        setEnteredTitle("");
        setBudgetCost("");
        setEnteredAmountType("income");

        stopEditingHandler();
    };










  return (
    <div>

          {/* 내역추가(날짜) */}
          <div className="new-item__form-info">
                <h2 className="fs-normal fw-regular">날짜</h2>
                <input
                    type="date"
                    value={enteredDate}
                    onChange={dateChangeHandler}
                    min="2020-01-01"
                    max={getDate()}
                    required
                />
            </div>

            <div className="new-item__form-info">
                <div className="new-item__form-info--title">
                    <h2 className="fs-normal fw-regular">제목</h2>
                    <span className="fs-tiny ft-alert" style={{ display: isTitleSizeOver ? "inline-block" : "none" }}>
                        {TITLE_SIZE}자까지만 입력할 수 있어요.
                    </span>
                </div>
                <input
                    type="text"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                    placeholder="사용 내역을 입력해주세요."
                    maxLength={TITLE_SIZE}
                    required
                />
            </div>

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
                    onChange={amountChangeHandler}
                    placeholder="금액을 입력해주세요."
                    maxLength="11"
                    required
                />
 
                  
                {/* 여기부터가 지출 input추가   */}
                <div>
                  <h2 className="fs-normal fw-regular">예상 비용</h2>
                    <span
                        className="fs-tiny ft-alert"
                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                    >
                        예상비용을 적어주세요 .
                    </span>
                    <input
                    type="text"
                    value={budgetExpenseCost}
                    onChange={budgetCostChangeHandler}
                    placeholder="예상비용을 입력해주세요"
                    maxLength={TITLE_SIZE}
                    required
                    />
                  
                  <h3 className="fs-normal fw-regular">분담</h3>
                    <span
                        className="fs-tiny ft-alert"
                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                    >
                        비용분담한 사람을 적어주세요.
                    </span>
                    <input
                    type="text"
                    value={budgetRole}
                    onChange={budgetRoleChangeHandler}
                    placeholder="비용분담자를 입력해주세요 (ex.신부)"
                    maxLength={TITLE_SIZE}
                    required
                    />

                  <h2 className="fs-normal fw-regular">비고</h2>
                    <span
                        className="fs-tiny ft-alert"
                        style={{ display: isEnteredWrongAmount ? "inline-block" : "none" }}
                    >
                        메모.
                    </span>
                    <input
                    type="text"
                    value={budgetMemo}
                    onChange={budgetMemoChangeHandler}
                    placeholder="비고."
                    maxLength={TITLE_SIZE}
                    required
                    />
                </div>

            </div>
    </div>
  )
}

export default ExpenseForm