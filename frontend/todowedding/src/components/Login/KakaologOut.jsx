import React, { useEffect } from "react";
import axios from "axios";
import Main from "../Main";

/*
 * 사용자가 로그아웃 버튼을 클릭하고 이 사이트에서만 로그아웃 클릭시 나오는 화면 (사용자가 카카오 로그인을 하면 사용자입장에선 안보여지는 페이지)
 * 작성 : 서유광
 * 일자 : 2023.09.11
 */

const KakaologOut = () => {
    const ACCESS_TOKEN = sessionStorage.getItem("kakaoAccess");
    const accessToken = JSON.parse(ACCESS_TOKEN).access_token;

    useEffect(() => {
        console.log("토근 >>> ", ACCESS_TOKEN);
        console.log(" 로그아웃용 카카오 토큰 " + accessToken);
        axios
            .post(
                "https://kapi.kakao.com/v1/user/logout",
                {},
                {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    // json: true,
                }
            )
            .then((response) => {
                console.log(response);
                sessionStorage.clear();
                // 성공적으로 로그아웃 처리가 되었다면 세션 스토리지의 토큰 정보 제거
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Main />
        </div>
    );
};

export default KakaologOut;