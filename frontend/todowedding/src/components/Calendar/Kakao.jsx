import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

const Kakao = () => {
    const token = useSelector((state) => state.Auth.token);

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

    let data = {
        event: JSON.stringify({
            title: "일정 제목",
            time: {
                start_at: "2023-09-27T03:00:00Z",
                end_at: "2023-09-27T06:00:00Z",
                time_zone: "Asia/Seoul",
                all_day: false,
                lunar: false,
            },
        }),
    };
    useEffect(() => {
        // event.append({
        //     title: "일정 제목",
        //     time: {
        //         start_at: "2023-09-15T03:00:00Z",
        //         end_at: "2023-09-16T06:00:00Z",
        //         time_zone: "Asia/Seoul",
        //         all_day: false,
        //         lunar: false,
        //     },
        // });

        getKakao();
    }, []);

    //사용자 캘린더 목록 불러오기
    const getKakao = () => {
        console.log("token >>>>>>>>", token);
        axios
            .get(getKakaoCalURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    return (
        <div>
            Kakao
            <button
                onClick={() => {
                    addKakaoCal();
                }}
            >
                일정 추가하기
            </button>
        </div>
    );
};

export default Kakao;
