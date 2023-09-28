/**
 * admin 전용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/Logo/header_logo_white.png";

const Admin = ({ loginUserNickname }) => {
    return (
        <div className="admin-header flex flex-row h-[90px] bg-gradient-to-r to-[#2C3540] from-[#465973]"
            style={{justifyContent:"space-between"}}>
            <Link to="/todowedding/admin" className="pt-3 ml-5 w-20">
                <img src={TodoLogo} alt="ToDo" style={{ cursor: "pointer" }} />
            </Link>
            <div className="w-60 text-xs text-right"  style={{marginRight:"5%"}}>
                <div className="text-white pt-3">
                    안녕하세요 <span className="text-bold text-[#9F7FFC]">{loginUserNickname}</span>님,
                </div>
                <div className="text-white">관리자 전용 페이지입니다.</div>
            </div>
        </div>
    );
};

export default Admin;
