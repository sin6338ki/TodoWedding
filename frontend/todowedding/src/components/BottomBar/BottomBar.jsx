import React, { useState } from "react";
import { Link } from "react-router-dom";
import WeddingReport from "../../assets/images/icon/footer_weddingreport.png";
import Calendar from "../../assets/images/icon/calendar.png";
import Budget from "../../assets/images/icon/budget.png";
import Home from "../../assets/images/icon/home.png";
import AddButton from "../../assets/images/icon/footer_plus.png";

import Modal from "../../components/Modal";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 */

function BottomBar() {
    const [add, setAdd] = useState(false);

    return (
        <div className="bottom-bar">
            <Link to="todowedding/weddingreport" className="footer-menu-left">
                <img className='bottom-bar-hover' src={WeddingReport} alt="WeddingReport" width="30px" />
                <span className="text-xs">웨딩리포트</span>
            </Link>
            <Link to="todowedding/calendar" className="footer-menu-right">
                <img className='bottom-bar-hover' src={Calendar} alt="Calendar" width="30px" />
                <span className="text-xs"> 일정관리</span>
            </Link>

            {/* AddButton */}
            {/* Modal 설정 */}
            <img
                className="footer-add"
                src={AddButton}
                alt="AddButton"
                width="55px"
                type="button"
                onClick={() => setAdd(!add)}
            />
            {add && <Modal closeModal={() => setAdd(!add)} />}

            <Link to="todowedding/budget" className="footer-menu-left">
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
