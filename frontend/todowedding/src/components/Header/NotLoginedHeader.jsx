/**
 * 비로그인시 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/icon/header_logo.png";

const NotLoginedHeader = () => {
    return (
        <div style={{display:"flex", justifyContent:"space-between"}} className="not-login-header fixed top-0 z-50 flex flex-row h-[90px] bg-gradient-to-r to-white from-[#D4C7F9]">
            <Link to="/" className="pt-[25px] ml-5">
                <img src={TodoLogo} alt="ToDo" width="95px" style={{ cursor: "pointer" }} />
            </Link>
            <Link to="/todowedding/login" className="self-center no-underline text-[#9F7FFC] mr-9">
                <span className="text-sm text-[#8d6cee]" >로그인</span>
            </Link>
        </div>
    );
};

export default NotLoginedHeader;
