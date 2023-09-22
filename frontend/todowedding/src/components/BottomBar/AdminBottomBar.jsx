/**
 * Admin 전용 Bottom Bar
 * 작성자 : 신지영
 * 작성일 : 2023.09.20
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteToken } from "../../redux/reducers/AuthReducer";

/**
 * 아이콘 import
 */
import Logout from "../../assets/images/icon/logout_white.png";
import Home from "../../assets/images/icon/home_white.png";
import Withdrawal from "../../assets/images/icon/trash_white.png";

const AdminBottomBar = () => {
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
            // .delete(`http://172.30.1.7:8085/partner/${token.userSeq}`)
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

    //Admin 계정 여부 확인
    const isAdmin = () => {
        axios
            .get(`http://localhost:8085/admin/${token.userSeq}`)
            // .get(`http://172.30.1.7:8085/admin/${token.userSeq}`)
            .then((res) => {
                console.log("isAdmin response : ", res.data);
                setIsAdminCk(res.data);
            })
            .catch((err) => {
                console.log("isAdmin error : ", err);
            });
    };

    useEffect(() => {
        isAdmin();
    }, [token]);

    return (
        <div className="admin-bottom-bar">
            <button
                onClick={() => {
                    partnerLogout();
                }}
                className="admin-bottom-bar-hover footer-menu-left"
            >
                <img className="mt-1" src={Logout} alt="Logout" width="20px" />
                <span className="text-xs mt-1 text-white"> 로그아웃</span>
            </button>
            <div
                onClick={() => {
                    handleShow();
                }}
                className="footer-menu-left admin-bottom-bar-hover"
            >
                <img className="mt-1" src={Withdrawal} alt="Withdrawal" width="20px" />
                <span className="text-xs mt-1 text-white"> 회원탈퇴</span>
            </div>
            <Link to="/todowedding/admin" className="footer-menu-left admin-bottom-bar-hover">
                <img className="mt-1" src={Home} alt="Home" width="20px" />
                <span className="text-xs mt-1 text-white"> Home</span>
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

export default AdminBottomBar;
