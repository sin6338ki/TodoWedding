import React, { useEffect } from "react";
import axios from "axios";
import Main from "../Main";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; //redux 액션 실행
import { deleteToken } from "../../redux/reducers/AuthReducer";

const KakaologOut = () => {
    const accessToken = JSON.parse(sessionStorage.getItem("kakaoAccess")).access_token;
    // const accessToken = JSON.parse(ACCESS_TOKEN).access_token;
    const token = useSelector((state) => state.Auth.token);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("로그아웃 토근 ㅣ ", token);
        axios
            .post(
                "https://kapi.kakao.com/v1/user/unlink",
                {},

                {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // json: true,
                }
            )
            .then((response) => {
                console.log(response);
                // 성공적으로 로그아웃 처리가 되었다면 세션 스토리지의 토큰 정보 제거
                // sessionStorage.removeItem('kakaoAccess');
                dispatch(deleteToken(accessToken));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //     // state = {
    //     //     isLogin: true,
    //     //   };

    return (
        <div>
            {" "}
            <Main />{" "}
        </div>
    );
};

export default KakaologOut;
