import React, { useCallback, useEffect, useMemo, useState } from "react";
import Budget from "./Budget";
import BudgetList from "./BudgetList";
import BudgetChart from "./BudgetChart";
import "../../assets/budget-css/BudgetContainer.css";
import BudgetIndex from "./BudgetIndex";
import BudgetRoleChart from "./BudgetRoleChart";
import NewItemContainer from "./NewItemContainer";

export const FilterContext = React.createContext();

// PocketContainer
const BudgetContainer = (props) => {
    const initialFilterBaseYear = new Date().getFullYear().toString();
    const [filterBaseYear, setFilterBaseYear] = useState(initialFilterBaseYear);
    let filteredItems = [];
    let filteredExpenses = [];

    useEffect(() => {
        if (props.isAddItem) {
            let lastedItemId = Math.max(...props.items.map((item) => item.id));
            let lastedItem = props.items.filter((item) => item.id === lastedItemId);
            let lastedFilterBaseYear = lastedItem[0].date.getFullYear().toString();
            setFilterBaseYear(lastedFilterBaseYear);
        }
    }, [props.items]);

    if (Array.isArray(filteredItems) && filteredItems.length > 0) {
        //수정
        filteredItems = props.items.filter((item) => item.date.getFullYear().toString() === filterBaseYear);
        // db에 수입 지출 구분할수있는게 없음... 수입(비용,날짜,내용) &  지출 (비용,날짜,내용) 테이블 필요함
        filteredExpenses = filteredItems.filter((item) => item.amountType === "expense");
    }

    const onChangeFilter = useCallback((selectedYear) => {
        setFilterBaseYear(selectedYear);
    }, []);

    const memoizedFilter = useMemo(() => {
        return { onChangeFilter, filteredItems, filterBaseYear, filteredExpenses };
    }, [filteredItems, filterBaseYear]);

    return (
            <div >
            <div >
                <NewItemContainer />
            </div>
            <div className="pocket__container">
                <FilterContext.Provider value={memoizedFilter}>
                    <Budget />

                    <BudgetIndex />

                    {/* <BudgetRoleChart /> */}
                </FilterContext.Provider>
            </div>
        </div>
    );
};

export default BudgetContainer;
