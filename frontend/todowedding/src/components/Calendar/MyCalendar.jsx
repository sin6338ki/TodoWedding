import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * FullCalendar 라이브러리 렌더링 페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.07
 */

const MyCalendar = () => {
    const nav = useNavigate();

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //로그인 전이면(userSeq가 0일 때) 다시 메인페이지로
    useEffect(() => {
        if (!userSeq) {
            nav("/");
        }
    }, [userSeq, nav]);

    //전체 일정 불러오기
    useEffect(() => {
        axios
            // .get(`http://localhost:8085/all-schedule/${userSeq}`)
            .get(`http://172.30.1.7:8085/all-schedule/${userSeq}`)
            .then((res) => {
                // 이벤트 컬러 화사한 색상으로만 뽑기------------------------------------------------------
                const fetchedEvents = res.data.map((event, idx) => {
                    const endDate = new Date(event.schedule_end_dt);
                    endDate.setDate(endDate.getDate() + 1);

                    const hue = Math.round(Math.random() * 360); // 전체 hue 범위 내에서 랜덤한 값 생성
                    const saturation = 80; // 채도
                    const lightness = 60; // 밝기
                    const alpha = 0.5; // 투명도 설정

                    return {
                        id: event.schedule_seq,
                        start: event.schedule_start_dt,
                        end: endDate.toISOString().split("T")[0],
                        title: event.schedule_contents,
                        color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
                    };
                });
                // end----------------------------------------------------------------------------------
                setEvents(fetchedEvents);
            })
            .catch((err) => {
                console.log("전체 일정 조회 error : ", err);
            });
    }, []);

    //날짜 클릭하면 일정 수정/삭제 페이지로 이동
    const handleDateClick = (info) => {
        const clickedDate = info.dateStr; // 'YYYY-MM-DD' format
        const eventsOnThisDay = events.filter(
            (event) => event.start.split("T")[0] === clickedDate || event.end.split("T")[0] === clickedDate
        );

        console.log(eventsOnThisDay);
    };

    //이벤트 클릭하면 해당 이벤트 정보 출력
    const handleEventClick = (info) => {
        const endDate = new Date(info.event.endStr);
        endDate.setDate(endDate.getDate() - 1);

        nav(`/todowedding/schedule/${info.event.id}`, {
            state: {
                title: info.event.title,
                start: info.event.startStr,
                end: endDate.toISOString().split("T")[0],
            },
        });

        setSelectedEvent(info.event); // 선택된 이벤트 저장
    };

    return (
        <div className="my-fullcalendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    left: "today,dayGridMonth,dayGridWeek",
                    //dayGridMonth, dayGridWeek
                    center: "title",
                    right: "prev,next",
                }}
                locale="ko" //한국어 설정
                height={"49vh"} //50
                events={events}
                contentHeight={"600"}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                buttonText={{
                    today: "오늘", // 'today' 버튼 텍스트 변경
                    month: "월", // 'month' 버튼 텍스트 변경
                    week: "주", // 'week' 버튼 텍스트 변경
                }}
            />
        </div>
    );
};

export default MyCalendar;
