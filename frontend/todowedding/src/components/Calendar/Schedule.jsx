import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/*
 * 일정추가 페이지에서 캘린더 추가하기, TodoList 추가하기
 * 작성자 : 서현록
 * 작성일 : 2023.09.07
 * 수정
 *  - 카카오 톡캘린더 API 연동 (신지영, 2023.09.09)
 */

const style = {
    input: `p-3 w-full text-lg`,
};

const Schedule = () => {
    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token.userSeq;

    useEffect(() => {
        console.log("accessToken : ", token);
    }, []);

    const nav = useNavigate();

    const location = useLocation();
    const [title, setTitle] = useState(location.state ? location.state.title : ""); //(09.14수진추가)

    // const [title, setTitle] = useState("");
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
                scheduleStartDt: startDate,
                scheduleEndDt: endDate,
                scheduleContents: title,
                memberSeq: userSeq,
            };
            await axios
                .post("http://172.30.1.7:8085/schedule", data)
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
                memberSeq: userSeq,
            };

            //backend axios통신
            await axios
                .post("http://172.30.1.7:8085/todolist", data)
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
                .get(`http://172.30.1.7:8085/all-schedule/${userSeq}`)
                .then((res) => {
                    console.log("전체 일정 조회 response : ", res.data);
                    setSchedule(res.data);
                })
                .catch((err) => {
                    console.log("전체 일정 조회 error : ", err);
                });
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div>
            <div className="add-container">
                <div action="/schedule" method="post" className="add-schedule-header">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={style.input}
                        type="text"
                        style={{ textAlign: "center", border: "none", background: "transparent", outline: "none" }}
                        placeholder="일정 제목을 입력하세요"
                    />
                </div>
                <div className="add-schedule-date">
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
                </div>
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
