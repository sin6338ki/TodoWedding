/**
 * 일반 회원용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import TodoLogo from "../../assets/images/todo_logo.png";

const MemberHeader = ({ marryDt, loginUserNickname, latestSchedule }) => {
    return (
        <div className="flex flex-row h-[90px] pl-2 pr-4 pb-1 bg-gradient-to-r from-[#DEDEED] to-white">
            <div className="flex flex-col self-center">
                {marryDt ? (
                    <Link to="/" className="self-center text-3xl text-[#9F7FFC] font-bold">
                        D-{marryDt}
                    </Link>
                ) : (
                    <Link to="/">
                        <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
                    </Link>
                )}

                <div className="text-[8px] mt-1 w-[99px] text-center">
                    반가워요, <br></br>
                    {loginUserNickname}님💜
                </div>
            </div>

            <div className="flex-auto ml-5 text-[14px] self-center pt-1">
                {latestSchedule ? (
                    <>
                        <span className="font-bold">{latestSchedule.schedule_start_dt}</span>에 <br></br>
                        <span className="font-extrabold text-[#9F7FFC] text-[16px]">
                            {latestSchedule.schedule_contents}
                        </span>
                        <br></br>일정이 기다리고 있어요!
                    </>
                ) : (
                    <div></div>
                )}
            </div>
            <Link to="/todowedding/login" className="border p-2 bg-[#9F7FFC] self-center text-slate-100 h-[34px]">
                {<GiHamburgerMenu />}
            </Link>
        </div>
    );
};

export default MemberHeader;
