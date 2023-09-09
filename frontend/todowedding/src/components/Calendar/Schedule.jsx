import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * 일정추가 페이지에서 캘린더 추가하기, TodoList 추가하기
 * 작성자 : 서현록
 * 작성일 : 2023.09.07
 * 수정
 *  - 카카오 톡캘린더 API 연동 (신지영, 2023.09.09)
 */

const style = {
    bg: `bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB]`,
    container: `m-auto p-4`,
    containerDate: `bg-slate-100 m-auto p-5`,
    input: `p-3 w-full text-lg`,
};

const Schedule = () => {
    const { accessToken } = useSelector((state) => state.authToken);

    useEffect(() => {
        console.log("accessToken : ", accessToken);
    }, []);

    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [schedule, setSchedule] = useState([]);

    //'캘린더 일정 추가' 버튼 클릭
    const createSchedule = async (e) => {
        e.preventDefault(e);
        console.log("캘린더 일정 추가 버튼 클릭!");
        if (title === "" || startDate === "" || endDate === "") {
            alert("일정 제목과 날짜를 입력해주세요!");
        } else {
            console.log("일정추가 제목 -> ", title);
            const data = {
                scheduleSeq: 1,
                scheduleStartDt: startDate,
                scheduleEndDt: endDate,
                scheduleContents: title,
                memberSeq: 123456789,
            };
            // await addKakaoCal();
            await axios
                .post("http://localhost:8085/schedule", data)
                .then((res) => {
                    console.log("스프링으로 넘기는 값 -> ", data);
                    //                fetchData();
                    allSchedule();
                    nav("/todowedding/calendar");
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    };

    //'TodoList 추가하기' 버튼 클릭
    const createTodo = async (e) => {
        e.preventDefault(e);
        console.log("투두리스트 추가 -> ", title);
        if (title === "") {
            alert("일정 제목을 입력해주세요!");
        } else {
            // boot에서 쓰는 dto참조해서 가져오기
            const data = {
                todolistContents: title,
                memberSeq: 123456789,
            };

            //backend axios통신
            await axios
                .post("http://localhost:8085/todolist", data)
                .then((res) => {
                    console.log("스프링으로 넘기는 값 -> ", data);
                    //                fetchData();
                    allSchedule();
                    nav("/todowedding/todolist");
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    };

    //전체 일정 조회 메서드
    const allSchedule = () => {
        try {
            axios
                //.get(`http://localhost:8085/all-schedule/${memberSeq}`)
                .get(`http://localhost:8085/all-schedule/123456789`)
                .then((res) => {
                    console.log("findAllSchedule 조회 response : ", res.data);
                    setSchedule(res.data);
                })
                .catch((err) => {
                    console.log("findAllSchedule 조회 error : ", err);
                });
        } catch (error) {
            console.error("Error", error);
        }
    };

    /**
     * Kakao 톡캘린더 연동하기
     * 일정 생성하기 (POST)
     * URL : https://kapi.kakao.com/v2/api/calendar/create/event
     * 파라미터 : 일정을 생성할 캘린더의 ID, 일정정보
     *            (단, ID를 지정하지 않으면 기본 캘린더(ID : primary)에 일정 생성)
     * EventCreate : 요청 body
     *  - String title : 일정제목(최대 50자)
     *  - Time time : 일정시간
     * 응답 : event_id (String)
     * */

    const addKakaoURL = "https://kapi.kakao.com/v2/api/calendar/create/event";

    const event = {
        title: title,
        time: {
            start_at: startDate,
            end_at: endDate,
            time_zone: "Asia/Seoul",
            all_day: true,
            lunar: false,
        },
    };

    const addKakaoCal = () => {
        axios
            .post(addKakaoURL, event, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then((res) => {
                console.log("addKakaoCal : ", res.data);
            })
            .catch((err) => {
                console.log("addKakaoCal error : ", err);
            });
    };

    return (
        <div>
            <div className="add-container">
                <form
                    action="/schedule"
                    method="post"
                    style={{ width: "480px" }}
                    className={style.container}
                    id="schedule-add-form"
                >
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={style.input}
                        type="text"
                        style={{ textAlign: "center", border: "none", background: "transparent", outline: "none" }}
                        placeholder="일정 제목을 입력하세요"
                    />
                </form>
                <form style={{ width: "480px" }} className={style.containerDate} id="schedule-date">
                    <h5>
                        일정 시작
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="add-date"
                        />
                    </h5>
                    <h5>
                        일정 종료
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="add-date"
                        />
                    </h5>
                </form>
            </div>
            <button className="Add-Schedule-btn" onClick={createSchedule}>
                캘린더 일정 추가하기
            </button>
            <button className="Add-TodoList-btn" onClick={createTodo}>
                Todo List 추가하기
            </button>
        </div>
    );
};

export default Schedule;
