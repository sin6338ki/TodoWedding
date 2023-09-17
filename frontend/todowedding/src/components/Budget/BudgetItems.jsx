import React, { useContext } from "react";
import Item from "./Item";
import { FilterContext } from "./BudgetContainer";
import "../../assets/budget-css/BudgetItems.css";

const BudgetItems = () => {
    const { filteredItems } = useContext(FilterContext);

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


      // budget list 가져오기 
      useEffect (()=>{
        const memberSeq = {
            "member_seq" : 101 // kakao-seq 로 바꿔주기 ! -->${memberSeq}로 바꾸기
        };

        axios.post(`http://localhost:8085/income/select`,memberSeq)
        .then(response => {
            console.log("222",response);
            setTotalExpense(response.data.budget_sum_cost);
            setTotalIncome(response.data.income_total_cost);
            setTotalBalance(response.data.marry_total_budget);
        })
        .catch(error => console.error('Error:', error));  
    },[])

    return (
        <div className="pocket__items">
            {sortedFilteredItems.map((item) => (
                <Item
                    key={member_seq}
                    id={income_seq}
                    date={income_dt}
                    title={income_contents}
                    amount={income_cost}
                    amountType={item.amountType}
                />
            ))}
        </div>
    );
};

export default BudgetItems;
