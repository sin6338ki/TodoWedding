import React from "react";
import Filter from "./Filter";
import BudgetItems from "./BudgetItems";
import "../../assets/budget-css/BudgetList.css";

const BudgetList = () => {
    return (
        <div className="pocket__list">
            <div className="pocket__list-header">
                <h2 className="fs-normal">수입 지출 내역</h2>
                <Filter />
            </div>
            <BudgetItems />
        </div>
    );
};

export default BudgetList;
