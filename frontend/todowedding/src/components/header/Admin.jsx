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
        <div className="flex flex-row h-[70px] bg-gradient-to-r to-white from-[#ebd6ff]">
            <Link to="/todowedding/admin" className="pt-3 ml-9">
                <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
            </Link>
            <div className="text-xs ml-24 self-center text-center">
                <div>
                    안녕하세요 <span className="text-bold text-[#9F7FFC]">{loginUserNickname}</span>님,
                </div>
                <div>관리자 전용 페이지입니다.</div>
            </div>
        </div>
    );
};

export default Admin;
