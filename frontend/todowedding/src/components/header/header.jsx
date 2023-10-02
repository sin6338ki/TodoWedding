import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

/**
 * 유저 상태별 헤더 컴포넌트
 */
import PartnerHeader from "./PartnerHeader";
import MemberHeader from "./MemberHeader";
import NotLoginedHeader from "./NotLoginedHeader";
import AdminHeader from "./Admin";

/*
 * Header
 * 작성자 : 서현록
 * 작성일 : 2023.09.04
 * 수정 :
 *  - 카카오 로그인 후 닉네임 적용, 로그아웃 세션 삭제 및 메인페이지 경로 수정 (양수진, 2023.09.08)
 *  - redux값 사용 위해 로고 클릭시 메인페이지 이동 Link로 변경 (신지영, 2023.09.09)
 *  - 카카오 로그인 후 바로 닉네임 렌더링 redux dispatch로 적용 (양수진, 2023.09.13)
 *  - D-day, 최근 일정 조회 header 적용, 헤더 유저별 컴포넌트 분리 (신지영, 2023.09.14)
 */

const Header = () => {
    //리덕스에서 사용자 정보 가져오기
    const token = useSelector((state) => state.Auth.token);
    //유저 닉네임
    const [loginUserNickname, setLoginUserNickname] = useState();
    //d-day 정보
    const [marryDt, setMarryDt] = useState();

    //헤더 상태 변수
    const [headerType, setHeaderType] = useState(null);

    //결혼일 조회
    const findMarryDt = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/marry-d-day/${token.userSeq}`)
            .then((res) => {
                if (res.data === 9999) {
                    return;
                } else if (res.data >= 0) {
                    setMarryDt("-" + res.data);
                } else {
                    let date = res.data * -1;
                    setMarryDt("+" + date);
                }
            })
            .catch((err) => {
                console.log("결혼일 조회 에러 : ", err);
            });
    };

    //Admin 계정 여부 확인
    const isAdmin = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/${token.userSeq}`).then((res) => {
            if (res.data === "Y") {
                setLoginUserNickname(token.userNick);
                setHeaderType("admin");
            } else {
                setLoginUserNickname(token.userNick);
                setHeaderType("partner");
            }
        });
    };

    //토큰 정보 확인 후 헤더 결정
    useEffect(() => {
        if (token != null) {
            if (token.type === "M") {
                const selectUserInfo = async () => {
                    await setHeaderType("member");
                    await setLoginUserNickname(token.userNick);
                    await findMarryDt();
                };
                setLoginUserNickname(token.userNick);
                selectUserInfo();
            } else {
                isAdmin();
            }
        } else {
            setHeaderType("notLogined");
        }
    }, [token]);

    return (
        <>
            {headerType === "member" && <MemberHeader marryDt={marryDt} loginUserNickname={loginUserNickname} />}
            {headerType === "partner" && <PartnerHeader loginUserNickname={loginUserNickname} />}
            {headerType === "admin" && <AdminHeader loginUserNickname={loginUserNickname} />}
            {headerType === "notLogined" && <NotLoginedHeader />}
        </>
    );
};

export default Header;
