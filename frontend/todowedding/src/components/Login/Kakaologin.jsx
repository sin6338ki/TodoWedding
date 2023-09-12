import React from "react";
import { Link } from "react-router-dom";
import kakao from "../../assets/snslogin/kakao.png";
import Logo from "../../assets/images/todo_logo.png";

/*
 * kakaologin
 * 작성자 : 양수진
 * 작성일 : 2023.09.04
 * 수정자 : 서유광 / 2023.09.07 - 백엔드 연동
 */

const Kakaologin = () => {
    // 사용자가 로그인 버튼 선택시 이동되는 URL
    const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=05e6f6ac6b8cd6cf3b1ec2a9ca6542de&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`;
    const logoutURL =
        "https://kauth.kakao.com/oauth/logout?client_id=05e6f6ac6b8cd6cf3b1ec2a9ca6542de&logout_redirect_uri=http://localhost:3000/auth/kakao/logout";

    return (
        <div>
            {/* <img src={Logo} width="300px" /> 이미지에서 오류나와서 주석
            <a className="kakao" href={loginURL}>
                <em></em>
                <img
                    src={kakao}
                    width={200}
                    alt="Kakao Login"
                    onClick={() => {
                        console.log("kakaologin 클릭!");
                    }}
                ></img>
            </a> */}

            <a href={loginURL}>
                <button>카카오 로그인</button>
            </a>
            <br />
            {/* 로그아웃을 하게 되면 다른 카카오 계정으로 로그인 가능 */}
            <a
                href={logoutURL}
                onClick={() => {
                    // sessionStorage.clear();
                }}
            >
                <button>카카오 로그아웃</button>
            </a>

            <br />
            <Link to="../partner/login" relative="path">
                <span>기업계정으로 시작하기</span>
            </Link>
            <br />
        </div>
    );
};

export default Kakaologin;
