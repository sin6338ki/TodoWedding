import React, { useState } from "react";
import { Link } from "react-router-dom";
import Todolist from "../../assets/images/icon/check-box.png";
import Partner from "../../assets/images/icon/map.png";
import Calendar from "../../assets/images/icon/calendar.png";
import Budget from "../../assets/images/icon/wallet.png";
import ModalBtn from "../../assets/images/Logo/ModalLogo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../components/Main/Modal";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 * 수정 : Modal 버튼 마우스 오버시 기능 안내 Tooltip 적용 (서현록, 2023.09.18)
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

    // Modal 버튼 Tooltip 스타일
    const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: theme.palette.common.white,
                //backgroundColor: 'rgba(238, 217, 255, 0.87)',
                color: "rgba(0, 0, 0, 0.87)",
                boxShadow: theme.shadows[3],
                fontSize: 13,
            },
        })
    );

    return (
        
        <div>
            <>
                <LightTooltip
                    title={
                        <React.Fragment>
                            버튼을 클릭해 투두웨딩의 <br /> 다양한 기능을 이용해보세요!
                        </React.Fragment>}
                        placement="top">
                        <button className="ModalBtn" type="button" 
                            onClick={() => {
                                if (!userSeq) {
                                    alert("로그인 후 서비스를 이용해주세요");
                                    nav("/");
                                    return;
                                }
                                setAdd(!add);
                            }}>
                            <img src={ModalBtn} className="ModalImage" alt="AddButton" />
                        </button>
                </LightTooltip>
                {add && <Modal closeModal={() => setAdd(!add)} />}
            </>

            <div className="bottom-bar">
                <Link to="todowedding/calendar" className="footer-menu-left ml-1 mt-1" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Calendar} alt="Calendar" width="18px" />
                    <span className="text-[7px] mt-1 font-medium">일정관리</span>
                </Link>
                <Link to="todowedding/todolist" className="footer-menu-left mr-12 ml-2 mt-1" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Todolist} alt="Todolist" width="18px" />
                    <span className="text-[7px] mt-1 font-medium">투두리스트</span>
                </Link>
                <Link to="/todowedding/budget" className="footer-menu-right ml-12 mt-1" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Budget} alt="Budget" width="18px" />
                    <span className="text-[7px] mt-1 font-medium">예산관리</span>
                </Link>
                <Link to="todowedding/map" className="footer-menu-right mt-1 ml-4" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Partner} alt="Partner" width="18px" />
                    <span className="text-[7px] mt-1 font-medium">업체찾기</span>
                </Link>
            </div>
        </div>
    );
};

export default MemberBottomBar;
