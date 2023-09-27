import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * 일정추가 페이지에서 캘린더 추가하기, TodoList 추가하기
 * 작성자 : 서현록
 * 작성일 : 2023.09.07
 * 수정
 *  - 카카오 톡캘린더 API 연동 (신지영, 2023.09.09)
 *  - 일정 시작일, 종료일 디버깅 완료 (서현록, 2023.09.20)
 */

const style = {
    input: `p-3 w-full text-lg`,
};

const Schedule = () => {
    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token.userSeq;

    const nav = useNavigate();

    const location = useLocation();
    const [title, setTitle] = useState(location.state ? location.state.title : ""); //(09.14수진추가)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [schedule, setSchedule] = useState([]);

    //'캘린더 일정 추가' 버튼 클릭
    const createSchedule = async (e) => {
        e.preventDefault(e);

        if (title === "" || startDate === "" || endDate === "") {
            alert("일정 제목과 날짜를 입력해주세요!");
        } else if (new Date(startDate) > new Date(endDate)) {
            alert("일정 종료일을 일정 시작일보다 빠르게 설정할 수 없습니다. 일정 날짜를 다시 선택해주세요");
        } else {
            const data = {
                scheduleStartDt: startDate,
                scheduleEndDt: endDate,
                scheduleContents: title,
                memberSeq: userSeq,
            };
            await axios
                .post("http://localhost:8085/schedule", data)
                .then((res) => {
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
                .get(`http://localhost:8085/all-schedule/${userSeq}`)
                .then((res) => {
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
                        placeholder="일정을 입력하세요"
                    />
                </div>
                <div className="add-schedule-date">
                    <div>
                        일정 시작일
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="add-date"
                        />
                    </div>
                    <div>
                        일정 종료일
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="add-date"
                        />
                    </div>
                </div>
            </div>
            <div className="Add-Schedule">
                <button className="Add-Schedule-btn" onClick={createSchedule}>
                    일정 추가
                </button>
                <button className="Add-TodoList-btn" onClick={createTodo}>
                    투두리스트 추가
                </button>
            </div>
        </div>
    );
};

export default Schedule;
