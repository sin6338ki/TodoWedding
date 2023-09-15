import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PartnerBottomBar from "./PartnerBottomBar";
import MemberBottomBar from "./MemberBottomBar";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 * 수정
 *  - 2023.09.14 로그인 전/후 처리 로직 추가 (작성자: 서현록)
 *  - 유저별 bottom bar 분리 (신지영, 2023.09.15)
 */

function BottomBar() {
    const token = useSelector((state) => state.Auth.token);

    useEffect(() => {
        console.log("bottom bar : ", token);
    }, []);

    return (
        <>
            <MemberBottomBar />
            {token != null && token.type == "P" && <PartnerBottomBar />}
        </>
    );
}

export default BottomBar;