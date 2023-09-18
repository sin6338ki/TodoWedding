/**
 * 업체 전용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";
import bell from "../../assets/images/icon/bell.png";

const PartnerHeader = ({ loginUserNickname }) => {
    return (
        <div className="header-bar flex flex-row justify-between bg-gradient-to-r to-white from-[#ebd6ff]">
            <Link to="/todowedding/partner" className="flex-col">
                <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
            </Link>
            <div className="text-xs self-center">반가워요, {loginUserNickname}님💜</div>
            <img src={bell} className="w-7 h-7 self-center mr-7 mt-1"></img>
        </div>
    );
};

export default PartnerHeader;
