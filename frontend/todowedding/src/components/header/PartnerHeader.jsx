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
        <div className="fixed top-0 z-50 w-[424px] h-[90px] flex flex-row bg-gradient-to-r to-white from-[#ebd6ff]">
            <Link to="/todowedding/partner" className="pt-[25px] ml-5">
                <img src={TodoLogo} alt="ToDo" width="110px" style={{ cursor: "pointer" }} />
            </Link>
            <div className="text-xs ml-36 self-center text-center">
                반가워요, <span className="text-bold text-[#9F7FFC]">{loginUserNickname}</span>님
            </div>
        </div>
    );
};

export default PartnerHeader;
