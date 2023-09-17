import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Main from "../Main";
import { useSelector, useDispatch } from 'react-redux';

/*
 * 사용자가 회원탈퇴 버튼클릭시 거치는 곳 
    ( 세션 삭제 시켜줘야하며 이 과정을 거치면 해당 SEQ를 가진 사용자의 DB 모든 데이터 삭제)
 * 작성 : 서유광
 * 일자 : 2023.09.11
 * member/delete
 * 수정자 : 서현록 / 2023.09.16 - 회원탈퇴 FE 처리, 화면 구현
 */


const KakaoDelete = () => {
    const dispatch = useDispatch();
    const rawAccessToken = sessionStorage.getItem("kakaoAccess");
    const accessToken = rawAccessToken ? JSON.parse(rawAccessToken).accessToken : null;
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token?.userSeq;

    useEffect(() => {
        if (!accessToken) {
            console.log('No access token found',accessToken);
            nav('/');  //
            return;
        }
        console.log("토큰 >>> ", accessToken);
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
                
                axios.get(`/member/delete?member_seq=${userSeq}`)
            .then((response) => {
                console.log(response);
                if(response.data === '회원 정보 삭제 완료') {
                    sessionStorage.clear();
                    dispatch(logout()); // 로그아웃 액션 디스패치
                    nav('/');
                    alert('회원탈퇴가 정상적으로 완료되었습니다.')
                }else {
                    console.log('회원 탈퇴 에러');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

  return (
    <div>
        <Main />
    </div>
  )
}

export default KakaoDelete