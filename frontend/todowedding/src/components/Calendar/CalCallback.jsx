import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

/**
 * redux 실행관련
 */
import { useDispatch } from "react-redux"; //redux 액션 실행
import { setToken } from "../../redux/reducers/AuthReducer";
import { useSelector } from "react-redux";

const CalCallback = () => {
    //redux 액션 실행을 위한 dispatch 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);

    // useSearchParams() : URL의 쿼리파라미터에 대한 접근과 조작을 할 수 있음
    const [searchParams] = useSearchParams();
    // Callback 화면 URL에서 code값 가져오기
    const code = searchParams.get("code");
    // console.log("code :", code);

    useEffect(() => {
        console.log("code :", code);
        // 3가지의 정보 전달 (사용자 seq, nick, access)
        axios
            .get(`http://172.30.1.7:8085/auth/kakao/cal/callback?code=${code}`)
            .then((res) => {
                const access_token = JSON.parse(res.data.kakaoAccess).access_token;

                //리덕스에 사용자 정보 저장
                dispatch(
                    setToken({
                        type: "M",
                        userSeq: res.data.userseq,
                        userNick: res.data.userNick,
                        accessToken: access_token,
                    })
                );
            })
            .catch((error) => {
                console.log("유저 정보를 가져오는데 실패 ", error);
                alert("로그인에 실패하였습니다.");
            });
    }, [code]);

    useEffect(() => {
        token && navigate("/kakaoCal");
    }, [token]);

    return <div>Kakao Calendar Callback</div>;
};

export default CalCallback;
