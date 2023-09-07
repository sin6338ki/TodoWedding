import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Callback = () => {
    // useSearchParams() : URL의 쿼리파라미터에 대한 접근과 조작을 할 수 있음
    const [searchParams] = useSearchParams();
    // Callback 화면 URL에서 code값 가져오기
    const code = searchParams.get("code");
    console.log("code :", code);

    /*
     * KakaoCallback (사용자가 카카오 로그인을 하면 사용자입장에선 안보여지는 페이지)
     * 작성자 : 서유광
     * 작성일 : 2023.09.07
     */

    useEffect(() => {
        console.log("code :", code);
        // 3가지의 정보 전달 (사용자 seq, nick, access)
        axios
            .get(`http://localhost:8085/auth/kakao/callback?code=${code}`)
            .then((res) => {
                console.log("accesstoken 정보 : ", res.data.kakaoAccess);
                // console.log("사용자 닉네임: ", res.data.userNick);
                // console.log("사용자 SEQ: ", res.data.userseq);

                // 메인페이지로 이동, 세션에 사용자 닉네임 SEQ값 전달
                sessionStorage.setItem("KakaoUserSeq", res.data.userseq);
                sessionStorage.setItem("KakaoUserNick", res.data.userNick);
                sessionStorage.setItem("kakaoAccess", res.data.kakaoAccess);

                window.location.href = "/";
            })
            .catch((error) => {
                console.log("유저 정보를 가져오는데 실패 ", error);
            });
    }, [code]);

    return <div></div>;
};

export default Callback;
