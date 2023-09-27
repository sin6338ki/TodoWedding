import React, { useCallback, useEffect, useMemo, useState } from "react";
import Budget from "./Budget";
import "../../assets/budget-css/BudgetContainer.css";
import BudgetIndex from "./BudgetIndex";
import NewItemContainer from "./NewItemContainer";

export const FilterContext = React.createContext();

// 예산관리 상위 컴포넌트
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
        
        filteredItems = props.items.filter((item) => item.date.getFullYear().toString() === filterBaseYear);
       
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
                </FilterContext.Provider>
            </div>
        </div>
    );
};

export default BudgetContainer;
