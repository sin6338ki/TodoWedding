import React from "react";
import checkIcon from "../../assets/images/icon/checked.png"

/*
 * 일정관리 페이지 하단 - 최근 TodoList 3가지 불러오기
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const MyTodo = ({ todolistContents}) => {

  const style = {
    row: `flex`
};

  return (
    <div>
      <li>
        <div className={style.row}>
          <img src={checkIcon} className="MyTodo-Icon"></img>
          <p>{todolistContents.todolistContents}</p>
        </div>
      </li>
    </div>
  )
}

export default MyTodo