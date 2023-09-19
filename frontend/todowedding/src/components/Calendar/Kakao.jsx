import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

const Kakao = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const schedule = useSelector((state) => state.CalReducer.schedule);
    const [startDt, setStartDt] = useState();
    const [endDt, setEndDt] = useState();
    const [title, setTitle] = useState();

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
    const getKakaoCalURL = "https://kapi.kakao.com/v2/api/calendar/calendars";

    useEffect(() => {
        setStartDt(schedule.start_at + "T03:00:00Z");
        setEndDt(schedule.end_at + "T06:00:00Z");
        setTitle(schedule.title);
    }, [schedule]);

    useEffect(() => {
        console.log("startDt", startDt);
        console.log("endDt", endDt);
        console.log("title", title);
        addKakaoCal();
    }, [startDt, endDt, title]);

    //사용자 캘린더 목록 불러오기
    const getKakao = () => {
        axios
            .get(getKakaoCalURL, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            })
            .then((res) => {
                console.log("캘린더 요청 : ", res.data);
            })
            .catch((err) => {
                console.log("캘린더 요청 에러 : ", err);
            });
    };

    //일정추가하기
    const addKakaoCal = () => {
        console.log("일정 추가 토큰 확인", token);

        axios({
            method: "post",
            url: addKakaoURL,
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({
                event: JSON.stringify({
                    title: title,
                    time: {
                        start_at: startDt,
                        end_at: endDt,
                        time_zone: "Asia/Seoul",
                        all_day: false,
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
