import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PartnerBottomBar from "./PartnerBottomBar";
import MemberBottomBar from "./MemberBottomBar";
import AdminBottomBar from "./AdminBottomBar";
import axios from "axios";

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
    const [isAdminCk, setIsAdminCk] = useState("N");

    //Admin 계정 여부 확인
    const isAdmin = () => {
        axios
            .get(`http://localhost:8085/admin/${token.userSeq}`)
            // .get(`http://172.30.1.7:8085/admin/${token.userSeq}`)
            .then((res) => {
                console.log("isAdmin response : ", res.data);
                setIsAdminCk(res.data);
            })
            .catch((err) => {
                console.log("isAdmin error : ", err);
            });
    };

    useEffect(() => {
        token && isAdmin();
    }, [token]);

    return (
        <>
            <MemberBottomBar />
            {token != null && isAdminCk == "Y" && token.type == "P" && <AdminBottomBar />}
            {token != null && isAdminCk != "Y" && token.type == "P" && <PartnerBottomBar />}
        </>
    );
}

export default BottomBar;
