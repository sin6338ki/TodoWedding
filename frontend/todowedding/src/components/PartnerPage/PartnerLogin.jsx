/**
 * 기업 전용 로그인 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";
import axios from "axios";

/**
 * redux 실행관련
 */
import { useDispatch } from "react-redux"; //redux 액션 실행
import { SET_PARTNER_INFO } from "../../Store/PartnerLoginInfo";
import { useSelector } from "react-redux";

const PartnerLogin = () => {
    const navigate = useNavigate();
    //redux 액션 실행을 위한 dispatch 선언
    const dispatch = useDispatch();
    const { partnerLoginInfo } = useSelector((state) => state.partnerLoginInfo);

    //아이디, 비밀번호 입력값 가져오기
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const inputId = (e) => {
        setId(e.target.value);
    };

    const inputPw = (e) => {
        setPw(e.target.value);
    };

    //redux 저장 확인
    useEffect(() => {
        console.log("partnerInfo redux 저장 확인 : ", partnerLoginInfo);
        if (partnerLoginInfo) {
            navigate("/todowedding/partner");
        }
    }, [partnerLoginInfo]);

    //로그인 버튼 클릭했을 때 이벤트
    const login = () => {
        axios
            .post("http://localhost:8085/partner/login", {
                partner_id: id,
                partner_pw: pw,
            })
            .then((res) => {
                console.log("login response : ", res.data);

                //쿠키에 Refresh Token, storage에 Access Token 저장
                dispatch(SET_PARTNER_INFO(res.data));
            })
            .catch((err) => {
                console.log("login fail : ", err);
                const loginInfo = document.getElementById("login-info");
                loginInfo.innerText = "회원 정보가 일치하지 않습니다. \n 아이디와 비밀번호를 다시 입력해 주세요.";
                loginInfo.style.color = "red";
                loginInfo.style.fontWeight = "bold";
            });
    };

    return (
        <div className="flex flex-col mx-auto mt-10">
            <img src={TodoLogo} className="w-72 self-center my-14"></img>
            <div className="self-center text-center">
                <p id="login-info" className="mb-10">
                    기업 전용 로그인 페이지입니다. <br></br>
                    아이디와 비밀번호를 입력해주세요.
                </p>
            </div>
            <div className="self-center text-center">
                <input
                    className="w-[288px] h-12 mb-1 border border-black rounded-md p-2 focus:outline-none"
                    type="text"
                    placeholder="아이디를 입력해 주세요"
                    onChange={(e) => {
                        inputId(e);
                    }}
                />
                <input
                    className="w-[288px] h-12 mb-3 border border-black rounded-md p-2 focus:outline-none"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    onChange={(e) => {
                        inputPw(e);
                    }}
                />
                <button
                    className="w-[288px] mb-1 bg-[#9F7FFC] border rounded-md h-12 text-white"
                    onClick={() => {
                        login();
                    }}
                >
                    로그인
                </button>
                <Link to="/todowedding/partner/join">
                    <button className="w-[288px] mb-3 bg-[#9F7FFC] border rounded-md h-12 text-white">
                        파트너로 가입하기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PartnerLogin;
