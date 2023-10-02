import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * redux 실행관련
 */
import { useDispatch } from "react-redux"; //redux 액션 실행
import { setToken } from "../../redux/reducers/AuthReducer";
import { useSelector } from "react-redux";

/*
 * KakaoCallback (사용자가 카카오 로그인을 하면 사용자입장에선 안보여지는 페이지)
 * 작성자 : 서유광
 * 작성일 : 2023.09.07
 * 수정일 : 2023.09.09 (신지영) - ACCESS_TOKEN 관리/저장(쿠키, 리덕스)
 * 수정일 : 2023.09.13 (양수진) - 사용자 닉네임 dispatch
 * 수정일 : 2023.09.14 (신지영) - 리덕스 정리
 * 수정일 : 2023.09.14 (서현록) - 로그인 후 일정관리 페이지로 이동
 */

const Callback = () => {
    //redux 액션 실행을 위한 dispatch 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);

    const [searchParams] = useSearchParams();
    // Callback 화면 URL에서 code값 가져오기
    const code = searchParams.get("code");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/kakao/callback?code=${code}`).then((res) => {
            const access_token = JSON.parse(res.data.kakaoAccess).access_token;
            //리덕스에 사용자 정보 저장
            dispatch(
                setToken({
                    type: "M",
                    userSeq: res.data.userseq,
                    userNick: res.data.userNick,
                    accessToken: access_token,
                    refreshToken: res.data.kakaoRefresh,
                })
            );
        });
    }, [code]);

    useEffect(() => {
        if (token) {
            if (token.type == "M") {
                navigate("/todowedding/calendar");
            } else {
                navigate("/");
            }
        }
    }, [token]);

    return <div></div>;
};

export default Callback;
