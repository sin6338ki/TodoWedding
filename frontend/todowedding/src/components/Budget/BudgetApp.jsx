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

    /*onAdd 함수: 새로운 아이템 추가함수
                  addItemData 객체를 받아서 items 배열에 추가하고, 
                  nextItemId 값을 1 증가시켜줍니다
    */
    const onAdd = useCallback((addItemData) => {
        setNextItemId((nextItemId) => nextItemId + 1);
        setIsAddItem(true);
        setItems((prevItems) => [...prevItems, addItemData]);
    }, []);

    /*onRemove 함수 :특정 아이템을 삭제하는 함수입니다. 
                    삭제할 item의 id값인 deleteItemData를 인자로 받아서 
                    해당 id와 일치하지 않은 item만 남기도록 items 배열을 필터링 합니다
    
    */
    const onRemove = useCallback((deleteItemData) => {
        setIsAddItem(false);
        setItems((items) => [...items].filter((item) => item.id !== deleteItemData));
    }, []);

    /* memoizedDispatches와 memoizedNextItemId: useMemo 훅으로 최적화된 변수들입니다. 
    이들은 ItemDispatchContext.Provider 컴포넌트의 value prop으로 전달되어 
    하위 컴포넌트에서 사용할 수 있게 됩니다.*/
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
