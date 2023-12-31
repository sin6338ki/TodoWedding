/**
 * 기업 전용 회원가입 폼
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TodoBg from "../../assets/images/Logo/Todo_BG.png";

const PartnerJoin = () => {
    const navigate = useNavigate();

    const [partnerId, setPartnerId] = useState();
    const [partnerPw, setPartnerPw] = useState();
    const [checkPartnerPw, setCheckPartnerPw] = useState();
    const [partnerName, setPartnerName] = useState();
    const [partnerRegistration, setPartnerRegistration] = useState();
    const [partnerTel, setPartnerTel] = useState();
    const [partnerLink, setPartnerLink] = useState();
    const [partnerManager, setPartnerManager] = useState();
    const [partnerManagerTel, setPartnerManagerTel] = useState();
    const [partnerAddress, setPartnerAddress] = useState();

    //회원가입시 전송 데이터
    const joinData = {
        partner_id: partnerId,
        partner_pw: partnerPw,
        partner_name: partnerName,
        partner_registration: partnerRegistration,
        partner_tel: partnerTel,
        partner_link: partnerLink,
        partner_manager: partnerManager,
        partner_manager_tel: partnerManagerTel,
        partner_address: partnerAddress,
    };

    //가입하기 버튼 클릭시 이벤트
    const applyJoin = () => {
        // console.log("회원가입 폼 입력 데이터 확인 : ", joinData);
        axios
            .post(`${process.env.REACT_APP_API_URL}/partner/join`, joinData)
            .then((res) => {
                // console.log("회원가입 response : ", res.data);
                if (res.data === "회원가입 완료") {
                    navigate("/todowedding/partner/login");
                }
            })
            .catch((err) => {
                console.log("회원가입 err 발생 : ", err);
            });
    };

    //아이디 중복 체크
    const checkSameId = () => {
        // console.log("중복체크 아이디 : ", partnerId);
        axios
            .get(`${process.env.REACT_APP_API_URL}/partner/check-id?partnerId=${partnerId}`)
            .then((res) => {
                if (res.data == 1) {
                    alert("사용 가능한 아이디입니다. ");
                } else {
                    alert("이미 존재하는 아이디입니다.");
                }
            })
            .catch((err) => {
                console.log("아이디 중복 체크 에러", err);
            });
    };

    //비밀번호 확인
    useEffect(() => {
        console.log("first");
        if (checkPartnerPw != partnerPw) {
            document.getElementById("checkPw").innerText = "비밀번호가 틀립니다.";
            document.getElementById("checkPw").style.color = "red";
        } else {
            document.getElementById("checkPw").innerText = "";
        }
    }, [checkPartnerPw]);

    return (
        <div className="partner-page mx-[10px] mt-[33px] w-[80%] flex flex-col">
            <div className="flex relative w-[180px] mt-[25%] mb-4 mx-auto">
                <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                <div className="text-center font-bold absolute w-full h-full mt-2">업체 전용 회원가입</div>
            </div>
            <div className="flex flex-col mr-[5%] ml-[5%]">
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">아이디</p>
                    <div className="flex flex-row ">
                        <input
                            onChange={(e) => {
                                setPartnerId(e.target.value);
                            }}
                            type="text"
                            className="w-[100%] border h-8 p-2 text-[#A383FF]"
                        ></input>
                        <button
                            onClick={() => {
                                checkSameId();
                            }}
                            className="text-xs ml-1 bg-gray-100 p-1"
                            style={{ width: "20%", height: "32px", borderRadius: "15%" }}
                        >
                            중복체크
                        </button>
                    </div>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">비밀번호</p>
                    <input
                        onChange={(e) => {
                            setPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">비밀번호 확인</p>
                    <p id="checkPw"></p>
                    <input
                        onChange={(e) => {
                            setCheckPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">기업명</p>
                    <input
                        onChange={(e) => {
                            setPartnerName(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">사업자등록번호</p>
                    <input
                        onChange={(e) => {
                            setPartnerRegistration(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">전화번호</p>
                    <input
                        onChange={(e) => {
                            setPartnerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">홈페이지</p>
                    <input
                        onChange={(e) => {
                            setPartnerLink(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">담당자</p>
                    <input
                        onChange={(e) => {
                            setPartnerManager(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">담당자 연락처</p>
                    <input
                        onChange={(e) => {
                            setPartnerManagerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">업체 주소</p>
                    <input
                        onChange={(e) => {
                            setPartnerAddress(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border h-8 p-2 text-[#A383FF]"
                    />
                </div>
                <div className="flex flex-row mx-[3%] mt-3">
                    <div className="flex flex-col mb-3 self-center w-[100%]">
                        <label htmlFor="email" className="mb-2 text-left text-gray-500">
                            마케팅 활용 동의
                        </label>
                        <div>
                            <input type="checkbox" name="agree" id="email" style={{ marginRight: "5px" }} />
                            <label htmlFor="email">마케팅 관련 정보 이메일 수신 동의</label>
                        </div>
                        <div>
                            <input type="checkbox" name="agree" id="sms" style={{ marginRight: "5px" }} />
                            <label htmlFor="sms">마케팅 관련 정보 SMS 수신 동의</label>
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="가입하기"
                        onClick={() => {
                            applyJoin();
                        }}
                        className="self-center ml-2 mt-3 h-[48px] w-[110px] rounded-md bg-gray-100 "
                    />
                </div>
            </div>
        </div>
    );
};

export default PartnerJoin;
