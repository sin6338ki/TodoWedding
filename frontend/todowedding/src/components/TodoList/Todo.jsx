import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


/*
 * Todo 
 * 작성자 : 양수진
 * 작성일 : 2023.09.04
 * 수정 : checkbox 클릭시 textComplete style적용 수정 (09.13)
 */

const style = {
    li: `flex justify-between p-4 my-2 capitalize border-b`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through text-gray-200`,
    button: `cursor-pointer flex items-center`,
};

const Todo = ({ todolistContents, deleteTodo }) => {

   const navigate = useNavigate();   // 투두 캘린더 추가 함수

   const handleCalendarButtonClick = () => {
    navigate('/todowedding/schedule', { 
      state: { 
        title: todolistContents.todolistContents,
        todolistSeq: todolistContents.todolistSeq
      }  
    });
}


    //userSeq 받아오기
  const token = useSelector((state) => state.Auth.token);
  const memberSeq = token.userSeq;
  
    const [isChecked, setIsChecked] = useState(todolistContents.completed);
    const [isCheckedValue, setIsCheckedValue] = useState(todolistContents.completed ? "Y" : "N" );
  
    const completedTodolist = () => {
      setIsChecked(!isChecked);
      setIsCheckedValue(isChecked ? "N" : "Y");
      toggleComplete();
    };


    useEffect(() => {
        console.log("todolistContents", todolistContents.todolistSeq);
      }, []);

    
    // 3 Backend [check_Todolist]
    //  투두리스트 체크했을 때 실행되는 메서드
    const toggleComplete = async () => {
        console.log("check_실행");
        const data = {
            // todolistCompleted: isCheckedValue,
            todolistCompleted: isChecked ? "Y" : "N", //checked 수정(09.13)
            todolistSeq: todolistContents.todolistSeq,
            memberSeq: todolistContents.memberSeq,
        };
        try {
            await axios.put(`http://localhost:8085/todolist/check`, data); //`http://localhost:8085/todolist/${memberSeq}/${todo.todolistSeq}`, data
            console.log("성공 checked ");
        } catch (err) {
            console.error("Error checked: ", err);
        }
    };

    useEffect(() => {
        console.log("todolistContents", todolistContents.todolistSeq);
    }, []);

    return (
        <li className={todolistContents.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                {/* <input onChange={() => toggleComplete(todolistContents)} type="checkbox" checked={todolistContents.completed ? 'checked' : ''} /> */}
                <input onChange={completedTodolist} type="checkbox" checked={isChecked} />
                <p
                    onClick={completedTodolist}  //toggleComplete(todolistContents)
                    className={isChecked ? style.textComplete : style.text}
                >
                    {todolistContents.todolistContents}
                </p>
                <hr />
            </div>
            <button onClick={() => deleteTodo(todolistContents.todolistSeq)} className="trashBtn">{<FaRegTrashAlt />}</button>
            <button className={style.row} style={{ marginRight: "50px"}} onClick={handleCalendarButtonClick}>➕캘린더</button>
        </li>
    );
};

export default Todo;