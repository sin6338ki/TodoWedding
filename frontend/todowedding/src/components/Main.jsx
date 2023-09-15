import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//메인 메뉴 아이콘
import Calendar from "../../src/assets/images/icon/calendar_bg.png";
import TodoList from "../../src/assets/images/icon/todolist_bg.png";
import Budget from "../../src/assets/images/icon/budget_bg.png";
import Map from "../../src/assets/images/icon/map_bg.png";

//React-Slick 라이브러리
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "./SlickSlider";

/*
 * 메인페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 * 수정일 :
 *  - Slick-Slider로 웨딩 가이드 연결 (서현록, 2023.09.14)
 *  - 로그인 전/후 처리 로직 추가 (서현록, 2023.09.14)
 */

const Main = () => {
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //메인에서 로그인 전/후 처리 로직
    const handleButtonClick = () => {
        if (!userSeq) {
            alert("로그인 후 진행해 주세요");
            nav("/");
            return;
        }
        // userSeq가 있는 경우, 원하는 페이지로 이동
        nav("/todowedding/weddingreport");
    };

    return (
        <div>
            <div>
                <SlickSlider />
            </div>
            <div style={{ display: "flex" }}>
                <Link to="todowedding/calendar" className="main-menu" onClick={handleButtonClick}>
                    <img src={Calendar} alt="Calender" width="70px" />
                    <span className="menu text-sm">일정관리</span>
                </Link>
                <Link to="todowedding/todolist" className="main-menu" onClick={handleButtonClick}>
                    <img src={TodoList} alt="TodoList" width="70px" />
                    <span className="menu text-sm">TodoList</span>
                </Link>
                <Link to="todowedding/budget" className="main-menu" onClick={handleButtonClick}>
                    <img src={Budget} alt="Budget" width="70px" />
                    <span className="menu text-sm">예산관리</span>
                </Link>
                <Link to="todowedding/map" className="main-menu" onClick={handleButtonClick}>
                    <img src={Map} alt="Map" width="70px" />
                    <span className="menu text-sm">업체찾기</span>
                </Link>
            </div>
        </div>
    );
};

export default Main;
