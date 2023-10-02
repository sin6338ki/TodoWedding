import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/BudgetItems.css";
import axios from "axios";

/* Budget 예산관리 정보
 * 작성자 : 양수진
 * 작성일 : 2023.09.14
 */
const BudgetItems = () => {
    const { filteredItems } = useContext(FilterContext);
    const [budget, setBudget] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/budget/select`);

                // 응답 데이터에서 필요한 정보 추출
                const budgetData = res.data.map((item) => ({
                    budget_seq: item.budget_seq,
                    budget_item: item.budget_item,
                    budget_expense_dt: item.budget_expense_dt,
                    budget_cost: item.budget_cost,
                    budget_role: item.budget_role,
                    budget_memo: item.budget_memo,
                    budget_expense_cost: item.budget_expense_cost,
                    member_seq: item.member_seq,
                }));

                // 추출한 데이터를 상태 변수에 설정
                setBudget(budgetData);
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();
    }, []);

    if (filteredItems.length === 0) {
        return (
            <div className="pocket__items">
                <span className="fw-light fs-normal" style={{ display: "block", textAlign: "center" }}>
                    입력된 데이터가 없어요 🙅
                </span>
            </div>
        );
    }

    return (
        <div className="pocket__items">
            {res.data.map((item) => (
                <Item
                    key={item.member_seq}
                    id={item.budget_seq}
                    date={item.budget_expense_dt}
                    title={item.item.budget_item}
                    amount={item.budget_cost}
                />
            ))}
        </div>
    );
};

export default BudgetItems;
