import React, { useEffect } from "react";
import axios from "axios";
import Main from "../Main";

/*
 * 사용자가 회원탈퇴 버튼클릭시 거치는 곳 
    ( 세션 삭제 시켜줘야하며 이 과정을 거치면 해당 SEQ를 가진 사용자의 DB 모든 데이터 삭제)
 * 작성 : 서유광
 * 일자 : 2023.09.11
 * member/delete
 */


const KakaoDelete = () => {
    const ACCESS_TOKEN = sessionStorage.getItem("kakaoAccess");
    const accessToken = JSON.parse(ACCESS_TOKEN).access_token;

    useEffect(() => {
        console.log("토근 >>> ", ACCESS_TOKEN);
        console.log(" 로그아웃용 카카오 토큰 " + accessToken);

        axios
            .post(
                "https://kapi.kakao.com/v1/user/unlink",
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
  )
}
