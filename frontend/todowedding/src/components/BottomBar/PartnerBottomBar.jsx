/**
 * Parner 회원 로그인시 bottom bar
 * 작성자 : 신지영
 * 작성일 : 2023.09.15
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteToken } from "../../redux/reducers/AuthReducer";
import axios from "axios";

/**
 * 아이콘 import
 */
import Logout from "../../assets/images/icon/logout.png";
import Info from "../../assets/images/icon/info.png";
import Home from "../../assets/images/icon/home.png";
import Withdrawal from "../../assets/images/icon/trash.png";

const PartnerBottomBar = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Auth.token);
    const navigate = useNavigate();

    //회원탈퇴 동의 모달
    const [show, setShow] = useState(false);
    const handleClose = (e) => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    //로그아웃 이벤트
    const partnerLogout = () => {
        const logout = async () => {
            await dispatch(deleteToken(token));
            await navigate("/");
        };
        logout();
    };

    //회원탈퇴 이벤트
    const withDrawal = () => {
        axios
            .delete(`http://localhost:8085/partner/${token.userSeq}`)
            .then((res) => {
                console.log("회원 탈퇴 결과 : ", res.data);

                const actionFunc = async () => {
                    await dispatch(deleteToken(token));
                    await navigate("/");
                    await alert("회원탈퇴에 성공하였습니다. 메인 페이지로 이동합니다!");
                };

                actionFunc();
            })
            .catch((err) => {
                console.log("회원 탈퇴 에러 : ", err);
            });
    };

    return (
        <div className="pl-5 bottom-bar">
            <Link to="todowedding/partner/info" className="footer-menu-left">
                <img className="bottom-bar-hover" src={Info} alt="Info" width="20px" />
                <span className="text-xs mt-2">정보수정</span>
            </Link>
            <button
                onClick={() => {
                    partnerLogout();
                }}
                className="footer-menu-left"
            >
                <img className="bottom-bar-hover" src={Logout} alt="Logout" width="20px" />
                <span className="text-xs mt-2"> 로그아웃</span>
            </button>
            <div
                onClick={() => {
                    handleShow();
                }}
                className="footer-menu-left"
            >
                <img className="bottom-bar-hover" src={Withdrawal} alt="Withdrawal" width="20px" />
                <span className="text-xs mt-2"> 회원탈퇴</span>
            </div>
            <Link to="/todowedding/partner" className="footer-menu-left">
                <img className="bottom-bar-hover" src={Home} alt="Home" width="20px" />
                <span className="text-xs mt-2"> Home</span>
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>TodoWedding을 탈퇴하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            handleClose(e);
                        }}
                    >
                        취소
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            handleClose(e);
                            withDrawal();
                        }}
                    >
                        탈퇴하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PartnerBottomBar;
