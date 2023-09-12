import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MyTodo from './MyTodo';

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
      { state: { title: info.event.title, start: info.event.startStr, end: endDate.toISOString().split('T')[0] } });

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
      <div>
        <MyTodo/>
        <button>일정추가</button>
        <button>항목별 체크리스트</button>
        <button>D-Day 체크리스트</button>
      </div>
    </div>
  );
};

export default MyCalendar;
