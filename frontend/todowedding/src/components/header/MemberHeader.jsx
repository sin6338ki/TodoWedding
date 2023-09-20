/**
 * 일반 회원용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import TodoLogo from "../../assets/images/todo_logo.png";
import axios from "axios";
import { useSelector } from "react-redux";

const MemberHeader = ({ marryDt, loginUserNickname }) => {
    //최근 일정 정보
    const [latestSchedule, setLatestSchedule] = useState({});
    const token = useSelector((state) => state.Auth.token);

    //최근 일정 조회
    const findLatestSchedule = () => {
        axios
            // .get(`http://localhost:8085/latest-schedule/${token.userSeq}`)
            .get(`http://172.30.1.7:8085/latest-schedule/${token.userSeq}`)
            .then((res) => {
                console.log("최근 일정 조회 결과 : ", res.data);
                if (res.data != "") {
                    //최신 일정 날짜 표시 변환
                    const dateData = res.data.schedule_start_dt.split("-");
                    const contents = res.data.schedule_contents;

                    setLatestSchedule({
                        schedule_contents: contents,
                        schedule_start_dt: dateData[0] + "년 " + dateData[1] + "월 " + dateData[2] + "일",
                    });
                } else {
                    setLatestSchedule("none");
                }
            })
            .catch((err) => {
                console.log("최근 일정 조회 error 발생 : ", err);
            });
    };

    useEffect(() => {
        findLatestSchedule();
    }, []);

    return (
        <div className="fixed top-0 z-50 w-[414px] flex flex-row h-[90px] pr-5 pb-1 bg-gradient-to-r to-white from-[#D4C7F9]">
            {marryDt ? (
                <Link to="/" className="decoration-transparent self-cente pt-4  mx-3 text-[#9F7FFC] font-bold ml-4 ">
                    <div className="decoration-double underline underline-offset-8 text-[24px] w-[70px]">
                        D{marryDt}
                    </div>
                </Link>
            ) : (
                <Link to="/">
                    <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} />
                </Link>
            )}

            <div className="flex flex-col ml-1 self-center w-[350px]">
                <div className="text-sm mt-2 text-start">
                    반가워요, <span className="font-bold">{loginUserNickname}</span>님
                </div>
                <div className="flex-auto text-xs pt-1">
                    {latestSchedule != "none" ? (
                        <>
                            <span className="font-bold">{latestSchedule.schedule_start_dt}</span>에 <br></br>
                            <span className="font-extrabold text-[#9F7FFC] text-sm">
                                {latestSchedule.schedule_contents}
                            </span>{" "}
                            <span className="text-xs">일정이 있어요!</span>
                        </>
                    ) : (
                        <div>
                            <span>
                                <span className="font-bold text-[#9F7FFC] ">TodoWedding</span>과 함께 <br></br>
                                쉽고 편하게 결혼을 준비해보세요!
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <Link to="/todowedding/login" className="border p-2 bg-[#9F7FFC] self-center underline text-slate-100">
                {<GiHamburgerMenu className="w-3 h-3" />}
            </Link>
        </div>
    );
};

export default MemberHeader;
