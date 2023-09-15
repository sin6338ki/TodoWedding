import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../assets/images/icon/logout.png";
import Info from "../../assets/images/icon/info.png";
import Home from "../../assets/images/icon/home.png";
import Withdrawal from "../../assets/images/icon/trash.png";
import { deleteToken } from "../../redux/reducers/AuthReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; //redux 액션 실행

const PartnerBottomBar = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Auth.token);
    const navigate = useNavigate();

    //로그아웃 모달
    const [show, setShow] = useState(false);

    const showModal = () => {};

    const partnerLogout = () => {
        const logout = async () => {
            await dispatch(deleteToken(token));
            await navigate("/");
        };
        logout();
    };

    return (
        <div className="bottom-bar">
            <Link to="todowedding/partner/info" className="footer-menu-left">
                <img className="bottom-bar-hover" src={Info} alt="Info" width="30px" />
                <span className="text-xs mt-1">업체정보수정</span>
            </Link>
            <div
                onClick={() => {
                    partnerLogout();
                }}
                className="footer-menu-left"
            >
                <img className="bottom-bar-hover" src={Logout} alt="Logout" width="30px" />
                <span className="text-xs mt-1"> 로그아웃</span>
            </div>
            <div
                onClick={() => {
                    showModal();
                }}
                className="footer-menu-left"
            >
                <img className="bottom-bar-hover" src={Withdrawal} alt="Withdrawal" width="30px" />
                <span className="text-xs mt-1"> 회원탈퇴</span>
            </div>
            <Link to="/todowedding/partner" className="footer-menu-left">
                <img className="bottom-bar-hover" src={Home} alt="Home" width="30px" />
                <span className="text-xs mt-1"> Home</span>
            </Link>
        </div>
    );
};

export default PartnerBottomBar;
