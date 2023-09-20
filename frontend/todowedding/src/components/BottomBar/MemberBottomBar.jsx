import React, { useState } from "react";
import { Link } from "react-router-dom";
import Todolist from "../../assets/images/icon/select.png";
import Partner from "../../assets/images/icon/map.png";
import Calendar from "../../assets/images/icon/calendar.png";
import Budget from "../../assets/images/icon/wallet.png";
import Home from "../../assets/images/icon/home.png";
import ModalBtn from "../../assets/images/TodoModal_bg.png";
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

    //메인에서 Home 버튼 클릭시 메인페이지로 이동
    const handleHomeButtonClick = () => {
        nav("/");
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
        // <div className="flex flex-col">
        <div>
            {/* AddButton */}
            {/* Modal 설정 */}
            {token === null ||
                (token.type != "P" && (
                    <>
                        <LightTooltip
                            title={
                                <React.Fragment>
                                    버튼을 클릭해 투두웨딩의 <br /> 다양한 기능을 이용해보세요!
                                </React.Fragment>
                            }
                            placement="top"
                        >
                            <button className="ModalBtn" type="button" onClick={() => setAdd(!add)}>
                                <img src={ModalBtn} className="ModalImage" alt="AddButton" />
                            </button>
                        </LightTooltip>
                        {add && <Modal closeModal={() => setAdd(!add)} />}
                    </>
                ))}

            <div className="bottom-bar">
                <Link to="todowedding/calendar" className="footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Calendar} alt="Calendar" width="20px" />
                    <span className="text-[6px] mt-1 font-light">CALENDAR</span>
                </Link>
                <Link to="todowedding/todolist" className="footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Todolist} alt="Todolist" width="20px" />
                    <span className="text-[6px] mt-1 font-light">TODO</span>
                </Link>
                <Link to="/" className="footer-menu-right" onClick={handleHomeButtonClick}>
                    <img className="bottom-bar-hover" src={Home} alt="Home" width="20px" />
                    <span className="text-[6px] mt-1 font-light">HOME</span>
                </Link>

                <Link to="/todowedding/budget" className="footer-menu-right">
                    <img className="bottom-bar-hover" src={Budget} alt="Budget" width="20px" />
                    <span className="text-[6px] mt-1 font-light"> BUDGET</span>
                </Link>
                <Link to="todowedding/map" className=" footer-menu-right" onClick={handleButtonClick}>
                    <img className="bottom-bar-hover" src={Partner} alt="Partner" width="20px" />
                    <span className="text-[6px] mt-1 font-light">STORE</span>
                </Link>
            </div>
        </div>
    );
};

export default MemberBottomBar;
