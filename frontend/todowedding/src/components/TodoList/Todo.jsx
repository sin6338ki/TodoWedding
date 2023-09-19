import React, { useDebugValue, useEffect, useState } from "react";
import { FaCloudDownloadAlt, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Todo_calendaricon from "../../assets/images/icon/Todo_calendaricon.png";

/*

Todo
작성자 : 양수진
작성일 : 2023.09.04
수정 : checkbox 클릭시 textComplete style적용 수정 (09.13)
수정 : check시 text style 변경(9.14) 
수정 : todolist 전체 - 완료 -미완료
*/
const style = {
    li: `flex justify-between p-4 my-2 capitalize border-b`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through text-gray-200`,
    button: `cursor-pointer flex items-center`,
};

const Todo = ({ todolistContents, deleteTodo, setChangeCheck, changeCheck }) => {
    const navigate = useNavigate(); // 투두 캘린더 추가 함수

    const handleCalendarButtonClick = () => {
        navigate("/todowedding/schedule", {
            state: {
                title: todolistContents.todolistContents,
                todolistSeq: todolistContents.todolistSeq,
            },
        });
    };

    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedValue, setIsCheckedValue] = useState(todolistContents.completed ? "Y" : "N");

    //기존 check함수
    const completedTodolist = () => {
        setIsChecked(!isChecked);
        setIsCheckedValue(isChecked ? "N" : "Y");
        toggleComplete();
    };

    useEffect(() => {
        console.log("todolistContents >>>>> ", todolistContents);
        //하나의 투두리스트 항목을 불러왔을 때 체크, 미체크 여부 판단해서 적용하기
        todolistContents.todolist_completed === "Y" ? setIsChecked(true) : setIsChecked(false);
    }, []);

    // 3 Backend [check_Todolist]
    //  투두리스트 체크했을 때 실행되는 메서드
    const toggleComplete = async () => {
        console.log("check_실행");
        const data = {
            // todolistCompleted: isCheckedValue,
            todolistCompleted: isChecked ? "N" : "Y", //checked 수정(09.13)
            todolistSeq: todolistContents.todolistSeq,
            memberSeq: todolistContents.memberSeq,
        };

        try {
            const checkResult = await axios.put(`http://localhost:8085/todolist/check`, data); //`http://localhost:8085/todolist/${memberSeq}/${todo.todolistSeq}`, data
            console.log("성공 checked ", checkResult);
            await setChangeCheck(!changeCheck);
        } catch (err) {
            console.error("Error checked: ", err);
        }
    };

    useEffect(() => {
        console.log("todolistContents", todolistContents.todolistSeq);
    }, []);

    useEffect(() => {
        toggleComplete;
        console.log("todolistContents", todolistContents.todolistSeq);
    }, [isChecked]);

    // useEffect(() => {
    //     toggleComplete
    //     console.log("todolistContents", todolistContents.todolistSeq);
    // }, [isChecked]);

    return (
        <li className={todolistContents.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                <input onChange={completedTodolist} type="checkbox" checked={isChecked} />
                <p
                    onClick={completedTodolist} //toggleComplete(todolistContents)
                    className={isChecked ? style.textComplete : style.text}
                >
                    {todolistContents.todolistContents}
                </p>
                <hr />
            </div>
            <button onClick={() => deleteTodo(todolistContents.todolistSeq)} className="trashBtn">
                {<FaRegTrashAlt />}
            </button>
            <button className={style.row} style={{ marginRight: "50px" }} onClick={handleCalendarButtonClick}>
                <img className="calendarIcon" src={Todo_calendaricon} alt="일정추가" width="20px" />
            </button>
            <button className={style.row} style={{ marginRight: "50px" }} onClick={handleCalendarButtonClick}>
                <img className="calendarIcon" src={Todo_calendaricon} alt="일정추가" width="20px" />
            </button>
        </li>
    );
};

export default Todo;
