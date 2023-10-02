/**
 * 일반 회원용 헤더
 * 작성자 : 신지영
 * 작성일 : 2023.09.14
 * 수정 : 결혼예정일 미등록시 결혼예정일 추가 페이지로 연결 (서현록, 2023.09.24)
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import headerBtn from "../../assets/images/icon/header-btn.png";
import TodoLogo from "../../assets/images/icon/logo_img.png";
import axios from "axios";
import { useSelector } from "react-redux";

const MemberHeader = ({ marryDt, loginUserNickname }) => {
    //최근 일정 정보
    const [latestSchedule, setLatestSchedule] = useState({});
    const token = useSelector((state) => state.Auth.token);

    //최근 일정 조회
    const findLatestSchedule = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/latest-schedule/${token.userSeq}`)
            .then((res) => {
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
        <div
            className="member-header fixed top-0 z-50 flex flex-row h-[90px] pr-5 pb-2"
            style={{ backgroundImage: "linear-gradient(to right, #D4C7F9, white)", backdropFilter: "blur(10px)" }}
        >
            {marryDt ? (
                <Link to="/" className="decoration-transparent self-cente pl-3 pt-4 ml-4 text-[#9F7FFC] font-bold ">
                    <div className="decoration-solid underline underline-offset-8 text-[25px]" id="marryFont">
                        D{marryDt}
                    </div>
                </Link>
            ) : (
                <Link to="/todowedding/marrydate" className="no-underline">
                    {/* <img src={TodoLogo} alt="ToDo" width="90px" style={{ cursor: "pointer" }} /> */}
                    <button className="flex relative w-[120px] mt-1">
                        <img src={TodoLogo} style={{ width: "27px" }} className="mt-3 ml-4 mb-3" />
                        <div className="ml-1 mt-4 font-bold text-[#7555d3] text-[11px] tracking-tighter">
                            결혼 예정일을 <br /> 등록해 주세요
                        </div>
                    </button>
                </Link>
            )}

            <div className="relative flex flex-col self-center w-[420px]">
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
                                <span className="font-bold text-[#9F7FFC]">TodoWedding</span>과 함께 <br></br>
                                쉽고 편하게 결혼을 준비해보세요!
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <Link to="/todowedding/login" className="border p-2 mr-1 self-center header-hamburger">
                <img src={headerBtn}></img>
            </Link>
        </div>
    );
};

export default MemberHeader;
