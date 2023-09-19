import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router-dom";

const Kakao = () => {
    const token = useSelector((state) => state.Auth.token);
    const location = useLocation();

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

    const [data, setData] = useState({});

    useEffect(() => {
        setData({
            event: JSON.stringify({
                title: location.state.data.title,
                time: {
                    start_at: location.state.data.start_at,
                    end_at: location.state.data.end_at,
                    time_zone: "Asia/Seoul",
                    all_day: false,
                    lunar: false,
                },
            }),
        });
    }, []);

    useEffect(() => {
        console.log("data 확인 : ", data);
        addKakaoCal();
    }, [data]);

    //사용자 캘린더 목록 불러오기
    const getKakao = () => {
        console.log("token >>>>>>>>", token.accessToken);
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
        // console.log("data 확인", event);
        console.log("일정 추가 토큰 확인", token);
        axios
            .post(addKakaoURL, qs.stringify(data), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("addKakaoCal : ", res.data);
            })
            .catch((err) => {
                console.log("addKakaoCal error : ", err);
            });
    };

    return <div></div>;
};

export default Kakao;
