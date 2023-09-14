import React, { useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import MyCalendar from './MyCalendar'
import MyTodoList from './MyTodoList';
import add_schedule from "../../assets/images/add_schedule.png"
import item_checklist from "../../assets/images/item_checklist.png"
import dday_checklist from "../../assets/images/dday_checklist.png"

/*
 * 일정관리 페이지
 * - FullCalendar, 최근 Todo List 3개, 버튼 3개
 * 작성자 : 서현록
 * 작성일 : 2023.09.14
 */


const Calendar = () => {
  const nav = useNavigate();

  // 캘린더 하단 투두리스트
    useEffect(() => {
      //axios.get(`http://localhost:8085/todolist/${memberSeq}`)
      axios.get(`http://localhost:8085/todolist/123456789`)
        .then((res) => {
          const fetchDataAndCout = async () => {
              await fetchData();
              cntTodoList(); //수정
          };
        })
    })
  
    //일정추가 버튼 클릭 시 이동
    const addSchedule = (() => {
      nav('/todowedding/schedule');
    })
  
    //항목별 체크리스트 클릭 시 이동
    const itemCheckList = (() => {
      nav('/checkitem');
    })
  
    //D-Day 체크리스트 클릭 시 이동
    const dDayCheckList = (() => {
      nav('/daychecklist')
    })

  return (
    <div>
      <MyCalendar /> 
      <div style={{ display: "flex"}}>
        <p className="TodoList-Title">최근 TodoList 3가지</p>
        <div>
              <button>
                  <img className='calendarBtn' src={add_schedule} 
                  alt="일정추가" width="56px" onClick={addSchedule}/>
              </button>
              <button>
                  <img className='calendarBtn' src={item_checklist} 
                  alt="항목별체크리스트" width="55px" onClick={itemCheckList}/>
                  </button>
              <button>
                  <img className='calendarBtn' src={dday_checklist} 
                  alt="D-Day체크리스트" width="60px" onClick={dDayCheckList}/>
              </button>
          </div>
        </div>
      <div style={{ display: "flex" }}>
        <MyTodoList/>
      </div>
    </div>
  )
}

export default Calendar