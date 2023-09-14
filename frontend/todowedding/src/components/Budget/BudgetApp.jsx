import React, { useCallback, useEffect, useState, useMemo } from "react";
import BudgetContainer, { FilterContext } from "./BudgetContainer";
import NewItemContainer from "./NewItemContainer";


export const ItemDispatchContext = React.createContext();

const BudgetApp = () => {
    const [isAddItem, setIsAddItem] = useState(false);
    const [nextItemId, setNextItemId] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem("items"));

        if (localItems === null) {
            localStorage.setItem("items", JSON.stringify(items));
            localStorage.setItem("nextItemId", nextItemId);

            return;
        }

        const localNextItemId = +localStorage.getItem("nextItemId");
        let copyLocalItems = [...localItems];

        copyLocalItems.forEach((item, index) => {
            copyLocalItems[index].date = new Date(item.date);
        });

        setItems(copyLocalItems);
        setNextItemId(localNextItemId);
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("nextItemId", nextItemId);
    }, [items]);

    const onAdd = useCallback((addItemData) => {
        setNextItemId((nextItemId) => nextItemId + 1);
        setIsAddItem(true);
        setItems((prevItems) => [...prevItems, addItemData]);
    }, []);

    const onRemove = useCallback((deleteItemData) => {
        setIsAddItem(false);
        setItems((items) => [...items].filter((item) => item.id !== deleteItemData));
    }, []);

    const memoizedDispatches = useMemo(() => {
        return { onAdd, onRemove };
    }, []);

    const memoizedNextItemId = useMemo(() => {
        return { nextItemId };
    }, [nextItemId]);

    return (
        <>
            <ItemDispatchContext.Provider value={[memoizedDispatches, memoizedNextItemId]}>
                <NewItemContainer />
                <BudgetContainer items={items} isAddItem={isAddItem} />
            </ItemDispatchContext.Provider>
        </>
    );
};

export default BudgetApp;
