import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * redux 실행관련
 */
import { useDispatch } from "react-redux"; //redux 액션 실행
import { setRefreshToken } from "../../storage/Cookie";
import { SET_TOKEN } from "../../Store/Auth";
import { parseJSON } from "jquery";
import { useSelector } from "react-redux";
/*
 * KakaoCallback (사용자가 카카오 로그인을 하면 사용자입장에선 안보여지는 페이지)
 * 작성자 : 서유광
 * 작성일 : 2023.09.07
 * 수정일 : 2023.09.09 (신지영) - ACCESS_TOKEN 관리/저장(쿠키, 리덕스)
 */

const Callback = () => {
    //redux 액션 실행을 위한 dispatch 선언
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authToken);
    const navigate = useNavigate();

    // useSearchParams() : URL의 쿼리파라미터에 대한 접근과 조작을 할 수 있음
    const [searchParams] = useSearchParams();
    // Callback 화면 URL에서 code값 가져오기
    const code = searchParams.get("code");
    console.log("code :", code);

    useEffect(() => {
        console.log("code :", code);
        // 3가지의 정보 전달 (사용자 seq, nick, access)
        axios
            .get(`http://localhost:8085/auth/kakao/callback?code=${code}`)
            .then((res) => {
                console.log("accesstoken 정보 : ", res.data.kakaoAccess);

                const access_token = parseJSON(res.data.kakaoAccess).access_token;
                const refresh_token = parseJSON(res.data.kakaoAccess).refresh_token;

                // console.log("access_token : ", parseJSON(res.data.kakaoAccess).access_token);
                // console.log("사용자 닉네임: ", res.data.userNick);
                // console.log("사용자 SEQ: ", res.data.userseq);

                // 메인페이지로 이동, 세션에 사용자 닉네임 SEQ값 전달
                sessionStorage.setItem("KakaoUserSeq", res.data.userseq);
                sessionStorage.setItem("KakaoUserNick", res.data.userNick);
                sessionStorage.setItem("kakaoAccess", res.data.kakaoAccess);

                //쿠키에 Refresh Token, storage에 Access Token 저장
                dispatch(SET_TOKEN(access_token));
                setRefreshToken(refresh_token);
            })
            .catch((error) => {
                console.log("유저 정보를 가져오는데 실패 ", error);
            });
    }, [code]);

    useEffect(() => {
        console.log("authToken : ", accessToken);
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken]);

    return <div></div>;
};

export default Callback;
