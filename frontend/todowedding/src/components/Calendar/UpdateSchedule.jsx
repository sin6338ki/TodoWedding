import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setSchedule } from "../../redux/reducers/CalReducer";
import { useDispatch } from "react-redux";
import talkCalendarLogo from "../../assets/images/icon/talk-calendar-logo.png";

/*
 * 일정 수정 / 삭제
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const UpdateSchedule = () => {
    const location = useLocation();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { scheduleSeq } = useParams();

    const [title, setTitle] = useState(location.state.title);
    const [startDate, setStartDate] = useState(location.state.start);
    const [endDate, setEndDate] = useState(location.state.end);

    const style = {
        input: `p-3 w-full text-lg`,
    };

    //추가동의항목을 위한 token 재요청 페이지로 이동
    const REST_API_KEY = "05e6f6ac6b8cd6cf3b1ec2a9ca6542de";
    const REDIRECT_URI = "http://localhost:3000/auth/kakaoCal/callback";
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_calendar`;

    // 일정 수정 함수
    const updateSchedule = async (e) => {
        e.preventDefault();

        if (title === "" || startDate === "" || endDate === "") {
            alert("일정 제목과 날짜를 입력해주세요!");
        } else if (new Date(startDate) > new Date(endDate)) {
            alert("일정 종료일을 일정 시작일보다 빠르게 설정할 수 없습니다. 일정 날짜를 다시 선택해주세요");
        } else {
            try {
                await axios.put(`http://localhost:8085/schedule/${scheduleSeq}`, {
                    scheduleStartDt: startDate,
                    scheduleEndDt: endDate,
                    scheduleContents: title,
                });

                alert("일정이 성공적으로 수정되었습니다.");
                nav("/todowedding/calendar");
            } catch (err) {
                console.log(err);
            }
        }
    };

    // 일정 삭제 함수
    const deleteSchedule = async () => {
        try {
            await axios.delete(`http://localhost:8085/schedule/${scheduleSeq}`);

            alert("일정이 성공적으로 삭제되었습니다.");
            nav("/todowedding/calendar");
        } catch (err) {
            console.log(err);
        }
    };

    // 화면 렌더링 했을 때, 수정했을 때 리덕스에 일정 값 저장
    useEffect(() => {
        dispatch(
            setSchedule({
                title: title,
                start_at: startDate,
                end_at: endDate,
            })
        );
    }, [title, startDate, endDate]);

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
                    <div>
                        일정 시작
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="add-date"
                        />
                    </div>
                    <div>
                        일정 종료
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="add-date"
                        />
                    </div>
                </div>
            </div>
            <button className="Add-Schedule-btn" onClick={updateSchedule}>
                수정하기
            </button>
            <button className="Add-TodoList-btn" onClick={deleteSchedule}>
                삭제하기
            </button>
            <Link to={URL} style={{ textDecorationLine: "none" }}>
                <button className="add-talk-calendar" style={{ display: "flex" }}>
                    <img
                        src={talkCalendarLogo}
                        alt="톡캘린더 연동하기"
                        style={{ width: "60px", marginRight: "15px" }}
                    />
                    <p style={{ marginTop: "17px", marginRight: "5px" }}>톡캘린더 연동하기</p>
                </button>
            </Link>
        </div>
    );
};

export default UpdateSchedule;
