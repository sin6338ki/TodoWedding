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
        <div className="fixed top-0 z-50 flex flex-row w-[414px] h-[90px] bg-gradient-to-r to-white from-[#D4C7F9]">
            <Link to="/" className="pt-[20px] ml-4">
                <img src={TodoLogo} alt="ToDo" className="w-[130px]" style={{ cursor: "pointer" }} />
            </Link>
            <Link to="/todowedding/login" className="ml-52 self-center no-underline text-[#9F7FFC]">
                <span className="text-sm text-[#9F7FFC]">로그인</span>
            </Link>
        </div>
    );
};

export default NotLoginedHeader;
