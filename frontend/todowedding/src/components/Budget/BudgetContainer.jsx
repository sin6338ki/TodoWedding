import React, { useCallback, useEffect, useMemo, useState } from "react";
import Budget from "./Budget";
import BudgetList from "./BudgetList";
import BudgetChart from "./BudgetChart";
import "../../assets/budget-css/BudgetContainer.css";
//import FilterContext from '../Budget/FilterContext'

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
            // let lastedFilterBaseYear = lastedItem[0].date.getFullYear().toString();
            // setFilterBaseYear(lastedFilterBaseYear);
            // 날짜를 String 타입으로 바꾸면서 코드 수정 중
        if (lastedItem.length > 0 && 'date' in lastedItem[0]) {
            let lastedFilterBaseYear = new Date(lastedItem[0].date).getFullYear().toString();
            setFilterBaseYear(lastedFilterBaseYear);
        }
    }
    }, [props.items]);

    if (Array.isArray(filteredItems) && filteredItems.length > 0) {
        //수정
        filteredItems = props.items.filter((item) => item.date.getFullYear().toString() === filterBaseYear);

        filteredExpenses = filteredItems.filter((item) => item.amountType === "expense");
    }

    const onChangeFilter = useCallback((selectedYear) => {
        setFilterBaseYear(selectedYear);
    }, []);

    // FilterContext 에러해결 추가 코드
    // const memoizedValue = useMemo(
    //     () => ({
    //         filteredItems,
    //         filteredItems,
    //         filterBaseYear,
    //         onChangeFilter,
    //     }),
    //     [onChangeFilter, filteredItems, filterBaseYear, filteredExpenses]
    // );

    const memoizedFilter = useMemo(() => {
        return { onChangeFilter, filteredItems, filterBaseYear, filteredExpenses };
    }, [filteredItems, filterBaseYear]);

    return (
        <div className="pocket__container">
            <FilterContext.Provider value={memoizedFilter}>
                <Budget />
                <BudgetList />
                <BudgetChart />
            </FilterContext.Provider>
        </div>
    );
};

export default BudgetContainer;
