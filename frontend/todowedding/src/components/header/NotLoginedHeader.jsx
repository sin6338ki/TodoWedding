/**
 * 비로그인시 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";

const NotLoginedHeader = () => {
    return (
        <div className="flex flex-row h-[70px] bg-gradient-to-r to-white from-[#ebd6ff]">
            <Link to="/" className="pt-3 ml-9">
                <img src={TodoLogo} alt="ToDo" className="w-[90px]" style={{ cursor: "pointer" }} />
            </Link>
            <Link to="/todowedding/login" className="ml-60 self-center no-underline text-[#9F7FFC]">
                <span className="text-sm text-[#9F7FFC]">로그인</span>
            </Link>
        </div>
    );
};

export default NotLoginedHeader;
