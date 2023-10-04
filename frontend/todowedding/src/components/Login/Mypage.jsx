import React from "react";
import axios from "axios";
import Logo from "../../assets/images/Logo/todo_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken } from "../../redux/reducers/AuthReducer"; // 로그아웃 액션 생성 함수

/*
 * 카카오 로그아웃, 회원 탈퇴
 * 작성자 : 서현록
 * 작성일 : 2023.09.16
 */

const Mypage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const logoutURL = process.env.REACT_APP_LOGOUT_URL;

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token?.userSeq;
    const accessToken = token?.accessToken; // accessToken 가져오기

    const handleDeleteAccount = async () => {
        // 회원에게 확인 메시지 표시
        if (window.confirm("정말 회원탈퇴하시겠습니까?")) {
            try {
                console.log("엑세스토큰 : ", accessToken);
                // 카카오 계정 연결 해제
                const unlinkResponse = await axios.post(
                    "https://kapi.kakao.com/v1/user/unlink",
                    {},
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                // console.log("Unlink response:", unlinkResponse);

                // 서버에 회원 정보 삭제 요청
                const deleteResponse = await axios.delete(
                    `${process.env.REACT_APP_API_URL}/member/delete?member_seq=${userSeq}`
                );
                // console.log("Delete response:", deleteResponse);

                // 로그아웃 처리
                sessionStorage.clear();
                dispatch(deleteToken());

                // 회원탈퇴 성공 알림창
                alert("회원 탈퇴가 정상적으로 처리되었습니다.");

                // 메인 페이지로 이동
                nav("/");
            } catch (error) {
                console.error("회원 탈퇴 에러", error.response || error);
            }
        }
    };

    return (
        <div className="Login-Page" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={Logo} width="300px" style={{ margin: "20px 0 35px 0" }} />
            <p>
                카카오 로그인 버튼 클릭 후
                <br />
                카카오계정과 함께 로그아웃을 진행하면
                <br />
                다른 카카오 계정으로 투두웨딩을 이용하실 수 있어요
            </p>
            <br />
            {/* 로그아웃을 하게 되면 다른 카카오 계정으로 로그인 가능 */}
            <div className="mypage-btn">
                <Link to={logoutURL}>
                    <button className="kakao-logout">카카오 로그아웃</button>
                </Link>
                <button onClick={handleDeleteAccount} className="member-delete">
                    회원탈퇴
                </button>
            </div>
        </div>
    );
};

export default Mypage;
