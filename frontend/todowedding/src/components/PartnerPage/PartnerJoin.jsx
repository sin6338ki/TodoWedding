/**
 * 기업 전용 회원가입 폼
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        console.log("회원가입 폼 입력 데이터 확인 : ", joinData);
        axios
            .post("http://localhost:8085/partner/join", joinData)
            .then((res) => {
                console.log("회원가입 response : ", res.data);
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
        axios
            .get(`http://localhost:8085/partner/join?parnerId=${partnerId}`)
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
        <div className="ml-10 mt-10 w-[480px] flex flex-col">
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">아이디</p>
                <div className="flex flex-row">
                    <input
                        onChange={(e) => {
                            setPartnerId(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2"
                    ></input>
                    <button
                        onClick={() => {
                            checkSameId();
                        }}
                        className="text-xs ml-5 bg-gray-100 p-2"
                    >
                        중복체크
                    </button>
                </div>
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">비밀번호</p>
                <input
                    onChange={(e) => {
                        setPartnerPw(e.target.value);
                    }}
                    type="password"
                    className="w-[480px] border h-8 p-2"
                ></input>
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">비밀번호 확인</p>
                <p id="checkPw"></p>
                <input
                    onChange={(e) => {
                        setCheckPartnerPw(e.target.value);
                    }}
                    type="password"
                    className="w-[480px] border h-8 p-2"
                ></input>
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">기업명</p>
                <input
                    onChange={(e) => {
                        setPartnerName(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">사업자등록번호</p>
                <input
                    onChange={(e) => {
                        setPartnerRegistration(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">전화번호</p>
                <input
                    onChange={(e) => {
                        setPartnerTel(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">홈페이지</p>
                <input
                    onChange={(e) => {
                        setPartnerLink(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                ></input>
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">담당자</p>
                <input
                    onChange={(e) => {
                        setPartnerManager(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">담당자 연락처</p>
                <input
                    onChange={(e) => {
                        setPartnerManagerTel(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="mb-3 self-center w-[480px]">
                <p className="mb-2 text-left">업체 주소</p>
                <input
                    onChange={(e) => {
                        setPartnerAddress(e.target.value);
                    }}
                    type="text"
                    className="w-[480px] border h-8 p-2"
                />
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col mb-3 self-center w-[480px]">
                    <label htmlFor="email" className="mb-2 text-left">
                        마케팅 활용 동의
                    </label>
                    <div>
                        <input type="checkbox" name="agree" id="email" />
                        <label htmlFor="email">마케팅 관련 정보 이메일 수신 동의</label>
                    </div>
                    <div>
                        <input type="checkbox" name="agree" id="sms" />
                        <label htmlFor="sms">마케팅 관련 정보 SMS 수신 동의</label>
                    </div>
                </div>
                <input
                    type="submit"
                    value="가입하기"
                    onClick={() => {
                        applyJoin();
                    }}
                    className="self-center h-[56px] w-[110px] rounded-md bg-gray-300"
                />
            </div>
        </div>
    );
};

export default PartnerJoin;
