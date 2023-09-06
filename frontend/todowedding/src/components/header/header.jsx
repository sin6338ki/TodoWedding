import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/logo6-removebg-preview.png";

const Header = () => {
    return (
        <div className="header-bar">
            <img
                src={TodoLogo}
                alt="ToDo"
                width="90px"
                onClick={() => {
                    window.location.href = "/";
                }}
            />
            <Link to="/todowedding/login">
                <span className="main-login text-sm">로그인</span>
            </Link>
        </div>
    );
};

export default Header;
