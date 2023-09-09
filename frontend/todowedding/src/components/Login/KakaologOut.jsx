import React, { useEffect } from "react";
import axios from "axios";
import Main from "../Main";

const KakaologOut = () => {
    //     // const ACCESS_TOKEN = sessionStorage.getItem('kakaoAccess');
    //     // console.log(" 로그아웃용 카카오 토큰 "+ ACCESS_TOKEN);

    //     const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('kakaoAccess'));
    //     console.log(" 로그아웃용 카카오 토큰 ", ACCESS_TOKEN);

    //     // state = {
    //     //     isLogin: true,
    //     //   };

    //     axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
    //     headers: {
    //     //  "Content-Type": "application/x-www-form-urlencoded",
    //      'Authorization': `Bearer ${ACCESS_TOKEN}`
    //      },
    //      json: true
    // })
    // .then((response) => {
    //     console.log(response);
    //     // 성공적으로 로그아웃 처리가 되었다면 세션 스토리지의 토큰 정보 제거
    //     // sessionStorage.removeItem('kakaoAccess');
    // })
    // .catch((error) => {
    //     console.error(error);
    // });

    return (
        <div>
            <Main />
        </div>
    );
};

export default KakaologOut;
