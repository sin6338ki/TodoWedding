import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import KakaoLogin from "../../assets/images/KakaoLogin.png"
import Logo from "../../assets/images/todo_logo.png";
import { useSelector } from "react-redux";

/*
 * kakaologin
 * 작성자 : 양수진
 * 작성일 : 2023.09.04
 * 수정자 : 서유광 / 2023.09.07 - 백엔드 연동
 * 수정자 : 서현록 / 2023.09.16 - 로그인 전후 화면 처리
 */

const Kakaologin = () => {
  //userSeq 받아오기
  const token = useSelector((state) => state.Auth.token);
  const userSeq = token?.userSeq;

  const nav = useNavigate();

  //userSeq가 있으면 마이페이지(로그아웃/회원탈퇴) 페이지로 이동
  useEffect(() => {
    if (userSeq) {
      nav('/todowedding/mypage');
    }
  }, [userSeq]);

    // 사용자가 로그인 버튼 선택시 이동되는 URL
    const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=05e6f6ac6b8cd6cf3b1ec2a9ca6542de&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`;
    
    return (
        <div className="Login-Page">
            <img src={Logo} width="300px" style={{margin: "20px 0 47px 0"}}/> 
            <p style={{marginBottom: "30px"}}>카카오 계정으로 간편하게 로그인하고
                <br/>Todo Wedding의 다양한 서비스를 이용해보세요
            </p>
            <a className="kakao" href={loginURL} >
                <img
                    src={KakaoLogin}
                    width={300}
                    alt="Kakao Login"
                    onClick={() => {
                    console.log("kakaologin 클릭!"); }}></img>
            </a>
            <div className="Partner-Login">
              <Link to="../partner/login" relative="path" className="Partner-Login-Link">
                  <p>기업계정으로 시작하기</p>
              </Link>
            </div>
        </div>
    );
};

export default Kakaologin;
