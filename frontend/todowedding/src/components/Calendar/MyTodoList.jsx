import React, { useState, useEffect } from "react";
import MyTodo from "./MyTodo";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*
 * 일정관리 페이지 하단 - 최근 TodoList 3가지 불러오기
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const MyTodoList = () => {
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    const [todos, setTodos] = useState([]);

    //로그인 전/후 로직 처리
    useEffect(() => {
        if (!userSeq) {
            nav("/");
        }
    }, [userSeq, nav]);

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
                // .get(`http://172.30.1.7:8085/todolist/${userSeq}`)
                .get(`http://172.30.1.7:8085/todolist/${userSeq}`)
                .then((res) => {
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
            {todos.map((todolistContents, index) => (
                <MyTodo key={index} todolistContents={todolistContents} />
            ))}
        </div>
    );
};

export default MyTodoList;
