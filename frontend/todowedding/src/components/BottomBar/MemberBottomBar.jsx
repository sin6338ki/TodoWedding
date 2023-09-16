import React, { useState } from "react";
import { Link } from "react-router-dom";
import Todolist from "../../assets/images/icon/to-do-list.png";
import Partner from "../../assets/images/icon/map.png";
import Calendar from "../../assets/images/icon/calendar.png";
import Budget from "../../assets/images/icon/budget.png";
import Home from "../../assets/images/icon/home.png";
import PlusBtn from "../../assets/images/icon/dance.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 */

const MemberBottomBar = () => {
    const [add, setAdd] = useState(false);
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //메인 BottomBar에서 로그인 전/후 처리 로직
    const handleButtonClick = () => {
        if (!userSeq) {
            alert("로그인 후 진행해 주세요");
            nav("/");
            return;
        }
        // userSeq가 있는 경우, 원하는 페이지로 이동
        nav("/todowedding/calendar");
    };
    return (
        // <div className="flex flex-col">
        <div>
            {/* AddButton */}
            {/* Modal 설정 */}
            {token === null ||
                (token.type != "P" && (
                    <>
                        <button
                            className="plus-btn flex flex-row rounded-full border mx-3"
                            type="button"
                            onClick={() => setAdd(!add)}
                        >
                            <img src={PlusBtn} className="ml-5 w-[30px]" alt="AddButton" />
                            <span className="ml-2 text-white font-bold">추가하기</span>
                        </button>
                        {add && <Modal closeModal={() => setAdd(!add)} />}
                    </>
                ))}

            <div className="bottom-bar">
                <Link to="/" className="footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Home} alt="Home" width="20px" />
                    <span className="text-[6px] mt-1">HOME</span>
                </Link>
                <Link to="todowedding/calendar" className="footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Calendar} alt="Calendar" width="20px" />
                    <span className="text-[6px] mt-1">CALENDAR</span>
                </Link>
                <Link to="todowedding/todolist" className="footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Todolist} alt="Todolist" width="20px" />
                    <span className="text-[6px] mt-1">TODO</span>
                </Link>

                <Link
                    to="todowedding/map"
                    className="
            footer-menu-right"
                    onClick={handleButtonClick}
                >
                    <img className="bottom-bar-hover" src={Partner} alt="Partner" width="20px" />
                    <span className="text-[6px] mt-1">STORE</span>
                </Link>
                <Link to="/todowedding/budget" className="footer-menu-right">
                    <img className="bottom-bar-hover" src={Budget} alt="Budget" width="20px" />
                    <span className="text-[6px] mt-1"> BUDGET</span>
                </Link>
            </div>
        </div>
    );
};

export default MemberBottomBar;
