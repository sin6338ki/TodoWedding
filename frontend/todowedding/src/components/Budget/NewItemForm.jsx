import React, { useCallback, useState, useContext } from "react";
// import코드 (ItemDispatchContext)app.js 추가 입력 하기
import { ItemDispatchContext } from "./BudgetApp";
import { enteredOnlyNumber, addComma, deleteComma } from "../utils/numberUtils";
import { StopEditContext } from "./NewItemContainer";
import '../../assets/budget-css/NewItemForm.css'
import axios from "axios";


    // GET : axios.get(url)
    // POST : axios.post(url, data)
    // PUT : axios.put(url, data)
    // DELETE : axios.delete(url)

    // axios 구조 : axios.get('url')
    // .then((res)=>{
    //       console.log("response : ", res.data);
    //       어떤식 데이터를 받는지 확인 후 내가 뭘 필요하는가를 생각해본 뒤 프론트(화면 혹은 변수로 지정)
    // }).catch((err)=>{
    //       console.log("error : ", err)
    // })

const NewItemForm = () => {
    const [{ onAdd }, { nextItemId }] = useContext(ItemDispatchContext);
    const { stopEditingHandler } = useContext(StopEditContext);

    const TITLE_SIZE = 35;

    const [enteredDate, setEnteredDate] = useState("");
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredAmountType, setEnteredAmountType] = useState("income");

    const [isTitleSizeOver, setIsTitleSizeOver] = useState(false);
    const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);

    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);

    

    // 날짜추가
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
        setEnteredAmount(amount);
    };

    // 수입 인지 지출인지 체크 
    const amountTypeChangeHandler = (event) => {
        setEnteredAmountType(event.target.value);
    };

    // 페이지 리로드 방지
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredData = {
            id: nextItemId,
            date: new Date(enteredDate),
            title: enteredTitle,
            amount: deleteComma(enteredAmount),
            amountType: enteredAmountType,
        };

        console.log("백엔드에 보낼 데이터 확인",enteredData);
        
    // backend 데이터 전송
    axios.post('http://localhost:8085/budget/insert', enteredData)
    .then(response => {
        console.log("entered Data : ", enteredData);
        console.log('지출날짜입력콘솔찍기',response);
    })
    .catch(error => {
        console.error('budget error!', error);
    });




        onAdd(enteredData); // 부모 컴포넌트로 enteredData 전달

        // 입력창 초기화
        setEnteredDate("");
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredAmountType("income");

        stopEditingHandler();
    };





  

    return (
        //내역추가(날짜)
        <form className="new-item__form" onSubmit={submitHandler}>
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
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                    placeholder="금액을 입력해주세요."
                    maxLength="11"
                    required
                />

                <div className="amount__type">
                    <div className="amount__income">
                        <input
                            type="radio"
                            id="income"
                            name="amount-type"
                            value="income"
                            onChange={amountTypeChangeHandler}
                            checked={enteredAmountType === "income" || ""}
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
                            checked={enteredAmountType === "expense" || ""}
                            required
                        />
                        <label htmlFor="expense" className="fs-small">
                            지출
                        </label>
                    </div>
                </div>
            </div>

            <div className="new-item__form-actions">
                <button type="submit" className="btn-purple">
                    등록
                </button>
                <button type="button" className="btn-white" onClick={stopEditingHandler}>
                    취소
                </button>
            </div>
        </form>
    );
};

export default NewItemForm;
