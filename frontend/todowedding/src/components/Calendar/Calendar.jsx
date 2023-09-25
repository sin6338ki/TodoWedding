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

/*
 * 일정관리 페이지
 * - FullCalendar, 최근 Todo List 3개, 버튼 3개
 * 작성자 : 서현록
 * 작성일 : 2023.09.14
 */

const Calendar = () => {
    const nav = useNavigate();

    //일정추가 버튼 클릭 시 이동
    const addSchedule = () => {
        nav("/todowedding/schedule");
    };

    //항목별 체크리스트 클릭 시 이동
    const itemCheckList = () => {
        nav("/checkitem");
    };

    //D-Day 체크리스트 클릭 시 이동
    const dDayCheckList = () => {
        nav("/daychecklist");
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
                        style={{width:"43px", 
                        margin: "0 10px 0 15px"}} 
                        onClick={addSchedule} />
                </button>
                <button>
                    <img
                        className="calendarBtn"
                        src={item_checklist}
                        alt="항목별체크리스트"
                        style={{width:"43px", 
                        margin: "0 010px 0 3px"}} 
                        onClick={itemCheckList}
                    />
                </button>
                <button>
                    <img
                        className="calendarBtn"
                        src={dday_checklist}
                        alt="D-Day체크리스트"
                        style={{width:"43px", 
                        margin: "0 0 0 3px"}} 
                        onClick={dDayCheckList}
                    />
                </button>
            </div>
            <div style={{ display: "flex" }}  className="report-container">
                <div style={{marginRight: "2%", width:"47.5%"}}>
                    <div className="report-header1">결혼 준비 진행도</div>
                    <div className="report-content1">
                        <TodoReport />
                    </div>
                </div>
                <div style={{marginLeft: "0.5%", width:"47.5%"}}>
                    <p className="report-header2">예산 현황</p>
                    <div className="report-content2">
                        <BudgetReport />
                    </div>
                </div>
            </div>
            <div style={{marginBottom:"10%"}}>
                <p className="TodoList-Title">최근 TodoList 3가지</p>
                <MyTodoList/>
            </div>
        </div>
    );
};

export default Calendar;
