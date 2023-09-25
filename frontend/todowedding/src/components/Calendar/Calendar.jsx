import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MyCalendar from "./MyCalendar";
import MyTodoList from "./MyTodoList";
import BudgetReport from "./BudgetReport";
import TodoReport from "./TodoReport";
import add_schedule from "../../assets/images/add_schedule.png";
import item_checklist from "../../assets/images/item_checklist.png";
import dday_checklist from "../../assets/images/dday_checklist.png";
import { deleteToken } from "../../redux/reducers/AuthReducer";
import { useSelector, useDispatch } from "react-redux";

/*
 * 일정관리 페이지
 * - FullCalendar, 최근 Todo List 3개, 버튼 3개
 * 작성자 : 서현록
 * 작성일 : 2023.09.14
 */

// 추가 : 2023.09.25 사용자토큰 유무 확인 유광작성
const Calendar = () => {
    const nav = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Token:", token); // 토큰 값 확인

        if (token) {
            // 토큰 유효성 확인경로
            axios
                .get("https://kapi.kakao.com/v1/user/access_token_info", {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                })
                .then((response) => {
                    console.log("Response:", response);
                    console.log("토큰이 유효합니다");
                })
                .catch((error) => {
                    console.log("토큰 검증 중 오류 발생:", error);
                    if (error.response) {
                        alert("세션이 만료되었습니다. 다시 로그인해주세요.");

                        // 세션 값 삭제 및 로그아웃 처리
                        dispatch(deleteToken());

                        // 메인 페이지로 이동
                        nav("/");
                    }
                });
        } else {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");

            // 세션 값 삭제 및 로그아웃 처리
            dispatch(deleteToken());

            // 메인 페이지로 이동
            nav("/");
        }
    }, [nav, dispatch, token]);

    //일정추가 버튼 클릭 시 이동
    const addSchedule = () => {
        nav("/todowedding/schedule");
    };

    return (
        <div>
            <MyCalendar />
            <div style={{ display: "flex" }} className="Calendar-plusBtn">
                <button>
                    <img
                        className="calendarBtn"
                        src={add_schedule}
                        alt="일정추가"
                        style={{ width: "43px", margin: "0 10px 0 15px" }}
                        onClick={addSchedule}
                    />
                </button>
                <button>
                    <img
                        className="calendarBtn"
                        src={item_checklist}
                        alt="항목별체크리스트"
                        style={{ width: "43px", margin: "0 010px 0 3px" }}
                        onClick={itemCheckList}
                    />
                </button>
                <button>
                    <img
                        className="calendarBtn"
                        src={dday_checklist}
                        alt="D-Day체크리스트"
                        style={{ width: "43px", margin: "0 0 0 3px" }}
                        onClick={dDayCheckList}
                    />
                </button>
            </div>
            <div style={{ display: "flex" }} className="report-container">
                <div style={{ marginRight: "2%", width: "47.5%" }}>
                    <div className="report-header1">결혼 준비 진행도</div>
                    <div className="report-content1">
                        <TodoReport />
                    </div>
                </div>
                <div style={{ marginLeft: "0.5%", width: "47.5%" }}>
                    <p className="report-header2">예산 현황</p>
                    <div className="report-content2">
                        <BudgetReport />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "10%" }}>
                <p className="TodoList-Title">최근 TodoList 3가지</p>
                <MyTodoList />
            </div>
        </div>
    );
};

export default Calendar;
