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
    //완료, 미완료 건수 조회하기
    const [completedCnt, setCompletedCnt] = useState();
    const [unCompletedCnt, setUnCompletedCnt] = useState();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    useEffect(() => {
        const fetchTodoListCount = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/count-of-todolist/${userSeq}`);

                /**
                 * count를 불러왔을 때 배열의 크기가 1인 경우 => 전체가 진행이거나 전체가 완료인 상태
                 * => 첫번째 값(0번 인덱스)가 N ==> 모두 진행인 상태 ==> 완료를 0, 진행을 배열[0] 값으로
                 * => 첫번째 값(0번 인덱스)가 Y ==> 모두 완료인 상태 ==> 진행을 0, 완료를 배열[0] 값으로
                 *
                 * count를 불러왔을 때 배열의 크기가 2인경우 => 진행, 완료 둘다 있는 상태
                 * 기존 대로
                 */
                if (res.data.length == 1) {
                    if (res.data[0].todolist_completed === "N") {
                        setCompletedCnt(0);
                        setUnCompletedCnt(res.data[0].count);
                    } else if (res.data[0].todolist_completed === "Y") {
                        setUnCompletedCnt(0);
                        setCompletedCnt(res.data[0].count);
                    }
                } else {
                    setUnCompletedCnt(res.data[0].count);
                    setCompletedCnt(res.data[1].count);
                }
            } catch (err) {
                console.log("cntTodoList err : ", err);
                setCompletedCnt(0);
                setUnCompletedCnt(0);
            }
        };

        fetchTodoListCount();
    }, [userSeq]);

    //투두리스트 총 건수/완료/미완료건수/달성률
    // const totalTodo = todoListCount && todoListCount.length > 1 ? todoListCount[0]?.count + todoListCount[1]?.count : 0;
    // const completedTodo = todoListCount && todoListCount.length > 1 ? todoListCount[1]?.count : 0;
    // const unCompletedTodo = todoListCount && todoListCount.length > 1 ? todoListCount[0]?.count : 0;
    // const todoRatio = totalTodo > 0 ? Math.round((completedTodo / totalTodo) * 100) : "0";
    const todoRatio =
        unCompletedCnt === 0 && completedCnt == 0
            ? 0
            : Math.round((completedCnt / (unCompletedCnt + completedCnt)) * 100);

    return (
        <div>
            {/* 투두리스트 조회 (전체_진행_완료)  */}
            {/* <div style={{ display: "flex", justifyContent: "space-between" }} className="mt-[25px] mx-[5%] mb-[25px]">
                {todos.length < 1 ? null : (
                    <span className={style.count}> {`전체 : ${unCompletedCnt + completedCnt}건`}</span>
                )}
                {todos.length < 1 ? null : <span className={style.count}> {`진행 : ${unCompletedCnt}건`}</span>}
                {todos.length < 1 ? null : <span className={style.count}> {`완료 : ${completedCnt}건`}</span>}
            </div> */}

            <>
                <p className="mb-1 underline">
                    총 투두리스트 : <span className="font-bold">{unCompletedCnt + completedCnt}</span>개
                </p>
                <p className="mb-1">- 완료 : {completedCnt}건</p>
                <p className="mb-1">- 미완료 : {unCompletedCnt}건</p>
                <p className="mb-1 font-bold">- 진행률 : {todoRatio}%</p>
            </>
        </div>
    );
};

export default TodoReport;
