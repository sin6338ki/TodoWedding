import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import MyTodoList from './MyTodoList';
import add_schedule from "../../assets/images/add_schedule.png"
import item_checklist from "../../assets/images/item_checklist.png"
import dday_checklist from "../../assets/images/dday_checklist.png"

/*
 * FullCalendar 라이브러리 렌더링 페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.07
 */

const MyCalendar = () => {
  const nav = useNavigate();

  const [events,setEvents] = useState([]);
  const [selectedEvent,setSelectedEvent] = useState(null);

  //전체 일정 불러오기
  useEffect(() =>{
      axios.get(`http://localhost:8085/all-schedule/123456789`)
          .then((res) => {
           
              const fetchedEvents = res.data.map((event, idx) => {
                const endDate = new Date(event.schedule_end_dt);
                endDate.setDate(endDate.getDate()+1);
                
                return {
                  id: event.schedule_seq,
                  start: event.schedule_start_dt,
                  end: endDate.toISOString().split('T')[0], 
                  title: event.schedule_contents,
                  color : '#' + Math.round(Math.random() * 0xffffff).toString(16)
              }});
              setEvents(fetchedEvents);
          })
          .catch((err) => {
              console.log("findAllSchedule 조회 error : ", err);
          });

  },[])

  //날짜 클릭하면 일정 수정/삭제 페이지로 이동
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr; // 'YYYY-MM-DD' format
    const eventsOnThisDay = events.filter(event => 
      event.start.split('T')[0] === clickedDate || event.end.split('T')[0] === clickedDate
    );
    
    console.log(eventsOnThisDay);
  }

    //이벤트 클릭하면 해당 이벤트 정보 출력
    const handleEventClick = (info) => {
      console.log('===============================');
      console.log('info.event => ', info.event)
      console.log('타이틀 : ', info.event.title); 
      console.log('일정 시작 : ', info.event.startStr); 
      console.log('일정 종료 : ', info.event.endStr);
      console.log('스케줄 Seq : ', info.event.id)

      const endDate = new Date(info.event.endStr);
      endDate.setDate(endDate.getDate() - 1);

      nav(`/todowedding/schedule/${info.event.id}`, 
      { state: { 
        title: info.event.title, 
        start: info.event.startStr, 
        end: endDate.toISOString().split('T')[0] 
      } });

      setSelectedEvent(info.event); // 선택된 이벤트 저장
  }


  // 캘린더 하단 투두리스트 (작성 중)
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
    <div style={{ margin:30 }}>
      <FullCalendar 
        className="my-fullcalendar"
        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          left:'today,dayGridMonth,dayGridWeek',
          //dayGridMonth, dayGridWeek
          center:'title',
          right:'prev,next'
        }}
        locale='ko' //한국어 설정
        height={"54vh"} //54
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
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
        <MyTodoList className="My-TodoList"/>
        
      </div>
    </div>
  );
};

export default MyCalendar;
