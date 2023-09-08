import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Guide from "../../src/assets/images/todo_main.png";

//메인 메뉴 아이콘
import Calendar from "../../src/assets/images/icon/calendar_bg.png";
import TodoList from "../../src/assets/images/icon/todolist_bg.png";
import Budget from "../../src/assets/images/icon/budget_bg.png";
import Map from "../../src/assets/images/icon/map_bg.png";

//React-Slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


/*
 * 메인페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 */

const Main = () => {
    useEffect(() => {
        //카카오 로그인 정보 가져오기 - 헤더에서 따서 쓰기
        const KakaoUserSeq = sessionStorage.getItem("KakaoUserSeq");
        const KakaoUserNick = sessionStorage.getItem("KakaoUserNick");
        console.log("카카오 로그인 정보 : ", KakaoUserNick, KakaoUserSeq);
    }, []);

    return (
        <div>
            <div>
            <img src={Guide} alt="Guide" />
            </div>
            <div style={{ display: "flex" }}>
                <Link to="todowedding/calendar" className="main-menu">
                    <img src={Calendar} alt="Calender" width="70px" />
                    <span className="menu text-sm">일정관리</span>
                </Link>
                <Link to="todowedding/todolist" className="main-menu">
                    <img src={TodoList} alt="TodoList" width="70px" />
                    <span className="menu text-sm">TodoList</span>
                </Link>
                <Link to="todowedding/budget" className="main-menu">
                    <img src={Budget} alt="Budget" width="70px" />
                    <span className="menu text-sm">예산관리</span>
                </Link>
                <Link to="todowedding/map" className="main-menu">
                    <img src={Map} alt="Map" width="70px" />
                    <span className="menu text-sm">업체찾기</span>
                </Link>
            </div>
        </div>
    );
};

export default Main;
