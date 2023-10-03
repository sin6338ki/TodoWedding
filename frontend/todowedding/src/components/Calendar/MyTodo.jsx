import React from "react";
import checkIcon from "../../assets/images/icon/check.png";

/*
 * 일정관리 페이지 하단 - 최근 TodoList 3가지 불러오기
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const MyTodo = ({ todolistContents }) => {
    const style = {
        row: `flex`,
    };

    return (
        <div>
            <div className={style.row}>
                <img src={checkIcon} className="MyTodo-Icon"></img>
                <p>{todolistContents.todolist_contents}</p>
            </div>
        </div>
    );
};

export default MyTodo;
