import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; //redux 액션 실행
import { deleteToken } from "../../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";

/*
 * 사용자가 로그아웃 버튼을 클릭하고 이 사이트에서만 로그아웃 클릭시 나오는 화면 (사용자가 카카오 로그인을 하면 사용자입장에선 안보여지는 페이지)
 * 작성 : 서유광
 * 일자 : 2023.09.11
 * 수정
 *  - 로그아웃 버튼 클릭시 dispatch 초기화하여 초기화면 렌더링 (양수진, 2023.09.13)
 *  - 로그아웃 기능 리덕스 통일 (신지영, 2023.09.14)
 *  */

const KakaologOut = () => {
    const token = useSelector((state) => state.Auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token != null) {
            console.log("token : ", token.accessToken);
            axios
                .post(
                    "https://kapi.kakao.com/v1/user/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    // 성공적으로 로그아웃 처리가 되었다면 세션 스토리지의 토큰 정보 제거
                    if (response.status == 200) {
                        dispatch(deleteToken(token));
                        navigate("/");
                    }
                })
                .catch((error) => {
                // 에러가 발생하면 강제로 투두 웨딩쪽 세션 정보(토큰 등) 삭제
                if (error.response && error.response.status === 401){
                    dispatch(deleteToken(token));
                    navigate("/");
                 }
                //  console.error(error);
             });
            }
    }, []);

    return <div></div>;
};

export default KakaologOut;
