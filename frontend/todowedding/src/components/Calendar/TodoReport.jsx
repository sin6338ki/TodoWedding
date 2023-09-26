import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

/*
 * 캘린더 하단 웨딩리포트 - 결혼준비 진행도 불러오기
 * 작성자 : 서현록
 * 작성일 : 2023.09.14
 * 수정
 *  - 달성률 까지 완료 (서현록, 2023.09.18)
 */

const TodoReport = () => {
    const [todoListCount, setTodoListCount] = useState(null);

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    useEffect(() => {
        const fetchTodoListCount = async () => {
            try {
                const response = await axios.get(`http://172.30.1.9:8085/count-of-todolist/${userSeq}`);
                setTodoListCount(response.data);
                console.log("TodoReport 결과 : ", response.data);
            } catch (error) {
                console.log("투두리스트 카운트 조회 에러 : ", error);
            }
        };

        fetchTodoListCount();
    }, [userSeq]);

    //투두리스트 총 건수/완료/미완료건수/달성률
    const totalTodo = todoListCount && todoListCount.length > 1 ? todoListCount[0]?.count + todoListCount[1]?.count : 0;
    const completedTodo = todoListCount && todoListCount.length > 1 ? todoListCount[1]?.count : 0;
    const unCompletedTodo = todoListCount && todoListCount.length > 1 ? todoListCount[0]?.count : 0;
    const todoRatio = totalTodo > 0 ? Math.round((completedTodo / totalTodo) * 100) : "0";

    return (
        <div>
            {todoListCount ? (
                <>
                    <p className="mb-1 underline">
                        총 투두리스트 : <span className="font-bold">{totalTodo > 0 ? totalTodo : "0"}</span>개
                    </p>
                    <p className="mb-1">- 완료 : {completedTodo > 0 ? completedTodo : "0"}건</p>
                    <p className="mb-1">- 미완료 : {unCompletedTodo > 0 ? unCompletedTodo : "0"}건</p>
                    <p className="mb-1 font-bold">- 진행률 : {todoRatio}%</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TodoReport;
