import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";

/*
 * Header
 * 작성자 : 서현록
 * 작성일 : 2023.09.04
 */

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
                style={{cursor: 'pointer'}}
            />
            <Link to="/todowedding/login" className="main-login">
                <span className="text-sm">로그인</span>
            </Link>
        </div>
    );
};

export default Header;
