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
    const [formattedEndDate, setFormattedEndDate] = useState();

    useEffect(() => {
        let date = new Date(schedule.end_at);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate() + 1;

        let dateStr = year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");

        console.log("dateStr: ", dateStr);

        setFormattedEndDate(dateStr);

        // const action = async () => {
        //     await setTitle(schedule.title);
        //     await setStartDt(schedule.start_at + "T00:00:00Z");
        //     await setEndDt(dateStr + "T00:00:00Z");
        //     await addKakaoCal();
        // };

        // action();
    }, [schedule]);

    useEffect(() => {
        console.log("formattedEnddate변환 : ", formattedEndDate);
        formattedEndDate != null && addKakaoCal();
    }, [formattedEndDate]);

    //일정추가하기
    const addKakaoCal = () => {
        // console.log("일정 추가 카카오톡 데이터 확인(start)", startDt);
        console.log("일정 추가 카카오톡 데이터 확인(end)", endDt);
        axios({
            method: "post",
            url: addKakaoURL,
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({
                event: JSON.stringify({
                    title: schedule.title,
                    time: {
                        start_at: schedule.start_at + "T00:00:00Z",
                        end_at: formattedEndDate + "T00:00:00Z",
                        time_zone: "Asia/Seoul",
                        all_day: true,
                        lunar: false,
                    },
                }),
            }),
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
