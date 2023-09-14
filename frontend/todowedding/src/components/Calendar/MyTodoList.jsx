import React, { useState, useEffect } from "react";
import MyTodo from "./MyTodo"
import axios from "axios";

/*
 * 일정관리 페이지 하단 - 최근 TodoList 3가지 불러오기
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const MyTodoList = () => {

  const [todos, setTodos] = useState([]);

  // 전체 투두리스트 조회
  useEffect(() => {
    const fetchDataAndCout = async () => {
        await fetchData();
    };

    fetchDataAndCout();
}, []);


// 전체 투두리스트 조회 메서드
const fetchData = () => {
    try {
        axios
            .get(`http://localhost:8085/todolist/123456789`) 
            //.get(`http://localhost:8085/todolist/${memberSeq}`)
            .then((res) => {
                //console.log("findallTodolist 조회 response : ", res.data);
                
                // 최근 투두리스트 3개만 가져오기
                const firstThreeItems = res.data.slice(0, 3);
                setTodos(firstThreeItems);
            })
            .catch((err) => {
                console.log("findallTodolist 조회 error : ", err);
            });
    } catch (error) {
        console.error("Error", error);
    }
  };
  
  return (
    <div>
        <ul>
           {todos.map((todolistContents, index) => (
            <MyTodo
                key={index}
                todolistContents={todolistContents}
                />
            ))}
        </ul>
    </div>
  )
}

export default MyTodoList