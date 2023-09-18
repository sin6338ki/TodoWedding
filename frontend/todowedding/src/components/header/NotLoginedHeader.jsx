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
        <div className="header-bar  bg-gradient-to-r from-[#9e59ff] to-[#ebd6ff]">
            <div className="welcome-nick">
                <Link to="/">
                    <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
                </Link>
                <Link to="/todowedding/login" className="main-login">
                    <span className="text-sm">로그인</span>
                </Link>
            </div>
        </div>
    );
};

export default NotLoginedHeader;
