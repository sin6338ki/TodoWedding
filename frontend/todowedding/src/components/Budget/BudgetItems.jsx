import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/BudgetItems.css";
import axios from "axios"






const BudgetItems = () => {
    const { filteredItems } = useContext(FilterContext);
    const [budget, setBudget] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:8085/budget/select");
          console.log("budget 지출 조회 response: ", res.data);
  
          // 응답 데이터에서 필요한 정보 추출
          const budgetData = res.data.map(item => ({
            budget_seq: item.budget_seq,
            budget_item: item.budget_item,
            budget_expense_dt: item.budget_expense_dt,
            budget_cost: item.budget_cost,
            budget_role: item.budget_role,
            budget_memo: item.budget_memo,
            budget_expense_cost: item.budget_expense_cost,
            member_seq: item.member_seq
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
  
    const copyFilteredItems = [...filteredItems];
    const sortedFilteredItems = copyFilteredItems.sort((a, b) => {
      // 날짜가 최근일수록 상단에 위치하도록 정렬
      // 만약 날짜가 같다면 id 값이 작은 순으로(최근에 입력한 순으로) 상단에 위치하도록 정렬
      if (new Date(a.date).getTime() === new Date(b.date).getTime()) {
        return b.id - a.id;
      }
  
      return new Date(b.date) - new Date(a.date);
    });
  
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