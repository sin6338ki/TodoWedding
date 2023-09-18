/**
 * admin 전용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";

const Admin = ({ loginUserNickname }) => {
    return (
        <div className="header-bar flex flex-row justify-between bg-gradient-to-r to-white from-[#ebd6ff]">
            <Link to="/todowedding/admin" className="flex-col">
                <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
            </Link>
            <div className="text-xs self-end pr-5">{loginUserNickname}님, 관리자 전용 페이지입니다.</div>
        </div>
    );
};

export default Admin;
