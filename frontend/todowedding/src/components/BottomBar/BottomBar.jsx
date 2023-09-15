import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import WeddingReport from "../../assets/images/icon/footer_weddingreport.png";
import Calendar from "../../assets/images/icon/calendar.png";
import Budget from "../../assets/images/icon/budget.png";
import Home from "../../assets/images/icon/home.png";
import ModalBtn from "../../assets/images/icon/plus (1).png"

import Modal from "../../components/Modal";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 * - 수정일 : 2023.09.14 록읜 전/후 처리 로직 추가 (작성자: 서현록)
 */

function BottomBar() {
    const [add, setAdd] = useState(false);
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    //메인 BottomBar에서 로그인 전/후 처리 로직 
    const handleButtonClick = () => {
        if (!userSeq) {
          alert('로그인 후 진행해 주세요');
          nav('/');
          return;
        }
        // userSeq가 있는 경우, 원하는 페이지로 이동
        nav('/todowedding/weddingreport');
      };

    return (
        <div className="bottom-bar">
            <Link to="todowedding/weddingreport" className="footer-menu-left"
                onClick={handleButtonClick}>
                <img className='bottom-bar-hover' src={WeddingReport} alt="WeddingReport" width="30px" />
                <span className="text-xs">웨딩리포트</span>
            </Link>
            <Link to="todowedding/calendar" className="footer-menu-right"
                onClick={handleButtonClick}>
                <img className='bottom-bar-hover' src={Calendar} alt="Calendar" width="30px" />
                <span className="text-xs"> 일정관리</span>
            </Link>

            {/* AddButton */}
            {/* Modal 설정 */}
            <img
                className="footer-add"
                src={ModalBtn}
                alt="AddButton"
                width="55px"
                type="button"
                onClick={() => setAdd(!add)}
            />
            {add && <Modal closeModal={() => setAdd(!add)} />}

            <Link to="todowedding/budget" className="footer-menu-left"
                onClick={handleButtonClick}>
                <img className='bottom-bar-hover' src={Budget} alt="Budget" width="32px" />
                <span className="text-xs"> 예산관리</span>
            </Link>
            <Link to="/" className="footer-menu-right">
                <img className='bottom-bar-hover' src={Home} alt="Home" width="30px" />
                <span className="text-xs"> Home</span>
            </Link>
        </div>
    );
}

export default BottomBar;
