import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

const Kakao = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const schedule = useSelector((state) => state.CalReducer.schedule);
    const [startDt, setStartDt] = useState(schedule.start_at);
    const [endDt, setEndDt] = useState(schedule.end_at);
    const [title, setTitle] = useState(schedule.title);
    const [event, setEvent] = useState({});

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

    useEffect(() => {
        setTitle(schedule.title);
        let date = new Date(schedule.end_at);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate() + 1;

        let dateStr = year + "-" + month + "-" + day;

        console.log("end date : ", dateStr);

        setStartDt(schedule.start_at + "T00:00:00Z");
        setEndDt(dateStr + "T00:00:00Z");
    }, [schedule]);

    useEffect(() => {
        console.log("startDt", startDt);
        console.log("endDt", endDt);
        console.log("title", title);
        setEvent({
            title: title,
            time: {
                start_at: startDt,
                end_at: endDt,
                time_zone: "Asia/Seoul",
                all_day: true,
                lunar: false,
            },
        });
    }, [startDt, endDt, title]);

    useEffect(() => {
        console.log("event : ", event);
        addKakaoCal();
        console.log("event 변환", qs.stringify(event));
    }, [event]);

    //일정추가하기
    const addKakaoCal = () => {
        console.log("일정 추가 토큰 확인", token);

        axios
            .post({
                url: addKakaoURL,
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                event: qs.stringify(event),
            })
            .then((res) => {
                console.log("addKakaoCal : ", res.data);
                if (res.data.event_id) {
                    navigate("/todowedding/calendar");
                }
            })
            .catch((err) => {
                console.log("addKakaoCal error : ", err);
                console.log(err);
            });
    };

    return <div></div>;
};

export default Kakao;
