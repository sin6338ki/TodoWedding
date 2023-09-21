import React, { useState, useMemo, useEffect } from "react";
import NewItem from "./NewItem";
import '../../assets/budget-css/NewItemContainer.css'


export const StopEditContext = React.createContext();

const style = {
    container: `max-w-[500px] w-full m-auto rounded-md  p-4 mt-100`,
    heading: `pt-3 text-3xl font-bold text-center text-greay-800`,
    form: `flex justify-between mt-[50px] mx-[25px] h-[40px] mr-[30px]`,
    input: `border p-2 w-full text-sm`,
    button: `p-1 ml-1 bg-gradient-to-r from-[#d68aff] to-[#9F7FFC] text-slate-100`,
    count: `text-center p-2`,
};


const NewItemContainer = () => {
    const [isEditing, setIsEditing] = useState(false);

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    const memoizedStopEdit = useMemo(() => {
        return { stopEditingHandler };
    }, []);

    return (
        <div className="new-item__container" style={{ cursor: !isEditing ? "pointer" : "auto" }}>
            {!isEditing && (
                // <button className="fs-normal fw-bold add-new-item-button" onClick={startEditingHandler}>
                <button className="fs-normal bg-gradient-to-r from-[#d68aff] to-[#9F7FFC]  fw-bold add-new-item-button" onClick={startEditingHandler} style={{borderRadius:"30px"}}>
                    예산 추가하기
                </button>
            )}
            {isEditing && (
                <StopEditContext.Provider value={memoizedStopEdit}>
                    <NewItem />
                </StopEditContext.Provider>
            )}
        </div>
    );
};

export default NewItemContainer;
