/**
 * partner info 수정 페이지
 * 작성자 : 신지영
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoBg from "../../assets/images/Logo/Todo_BG.png";

const PartnerInfo = () => {
    const token = useSelector((state) => state.Auth.token);
    const navigate = useNavigate();
    const [partnerInfo, setPartnerInfo] = useState({});

    const [partnerPw, setPartnerPw] = useState("");
    const [inputPartnerPw, setInputPartnerPw] = useState(partnerPw);

    const [checkPartnerPw, setCheckPartnerPw] = useState("");

    const [partnerName, setPartnerName] = useState("");
    const [inputPartnerName, setInputPartnerName] = useState(partnerName);

    const [partnerRegistration, setPartnerRegistration] = useState("");
    const [inputPartnerRegistration, setInputPartnerRegistration] = useState(partnerRegistration);

    const [partnerTel, setPartnerTel] = useState("");
    const [inputPartnerTel, setInputPartnerTel] = useState(partnerTel);

    const [partnerLink, setPartnerLink] = useState("");
    const [inputPartnerLink, setInputPartnerLink] = useState(partnerLink);

    const [partnerManager, setPartnerManager] = useState("");
    const [inputPartnerManager, setInputPartnerManager] = useState(partnerManager);

    const [partnerManagerTel, setPartnerManagerTel] = useState("");
    const [inputPartnerManagerTel, setInputPartnerManagerTel] = useState(partnerManagerTel);

    const [partnerAddress, setPartnerAddress] = useState("");
    const [inputPartnerAddress, setInputPartnerAddress] = useState(partnerAddress);

    const [partnerUpdateDto, setPartnerUpdateDto] = useState();

    useEffect(() => {
        //업체 정보 조회
        findPartnerInfo();
        // console.log("partnerUpdateDto", partnerUpdateDto);
    }, [partnerUpdateDto]);

    //업체 정보 조회 메서드
    const findPartnerInfo = () => {
        token &&
            axios
                .get(`${process.env.REACT_APP_API_URL}/partner/info/${token.userSeq}`)
                .then((res) => {
                    // console.log("업체 정보 조회 result : ", res.data);
                    setPartnerInfo(res.data);
                    setPartnerPw(res.data.partner_pw);
                    setPartnerName(res.data.partner_name);
                    setPartnerRegistration(res.data.partner_registration);
                    setPartnerTel(res.data.partner_tel);
                    setPartnerLink(res.data.partner_link);
                    setPartnerManager(res.data.partner_manager);
                    setPartnerManagerTel(res.data.partner_manager_tel);
                    setPartnerAddress(res.data.partner_address);
                })
                .catch((err) => {
                    console.log("업체 정보 조회 err : ", err);
                });
    };

    //비밀번호 확인
    useEffect(() => {
        if (checkPartnerPw != partnerPw) {
            document.getElementById("checkPw").innerText = "비밀번호가 틀립니다.";
            document.getElementById("checkPw").style.color = "red";
        } else {
            document.getElementById("checkPw").innerText = "";
        }
    }, [checkPartnerPw]);

    //업체 정보 변경
    useEffect(() => {
        // console.log("partnerName", partnerName);
        token &&
            setPartnerUpdateDto({
                partnerSeq: token.userSeq,
                partnerPw: inputPartnerPw || partnerInfo.partner_pw,
                partnerName: inputPartnerName || partnerInfo.partner_name,
                partnerRegistration: inputPartnerRegistration || partnerInfo.partner_registration,
                partnerTel: inputPartnerTel || partnerInfo.partner_tel,
                partnerLink: inputPartnerLink || partnerInfo.partner_link,
                partnerManager: inputPartnerManager || partnerInfo.partner_manager,
                partnerManagerTel: inputPartnerManagerTel || partnerInfo.partner_manager_tel,
                partnerAddress: inputPartnerAddress || partnerInfo.partner_address,
            });
    }, [
        token,
        inputPartnerPw,
        inputPartnerName,
        inputPartnerRegistration,
        inputPartnerTel,
        inputPartnerLink,
        inputPartnerManager,
        inputPartnerManagerTel,
        inputPartnerAddress,
    ]);

    //회원 정보 업데이트
    const updatePartnerInfo = () => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/partner`, partnerUpdateDto)
            .then((res) => {
                // console.log("기업 회원 정보 update response", res);
                alert("회원 정보 수정이 완료되었습니다.!");
                navigate("/todowedding/partner");
            })
            .catch((err) => {
                // console.log("기업 회원 정보 update error", err);
                alert("회원 정보 수정에 실패했습니다.");
            });
    };

    return (
        <div className="partner-page mx-[10px] mt-[33px] w-[80%] flex flex-col">
            <div className="flex relative w-[180px] mt-[25%] mb-4 mx-auto">
                <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                <div className="text-center font-bold absolute w-full h-full mt-2">업체 정보 수정하기</div>
            </div>
            <div className="flex flex-col mr-[5%] ml-[5%]">
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">아이디</p>
                    <input
                        value={partnerInfo.partner_id || ""}
                        disabled
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">비밀번호</p>
                    <input
                        defaultValue={partnerInfo.partner_pw}
                        onChange={(e) => {
                            setInputPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[100%] border text-[#8267d3] h-8 p-2 "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">비밀번호 확인</p>
                    <p id="checkPw"></p>
                    <input
                        defaultValue={partnerInfo.partner_pw}
                        onChange={(e) => {
                            setCheckPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">기업명</p>
                    <input
                        defaultValue={partnerInfo.partner_name}
                        onChange={(e) => {
                            // console.log("기업명 변경", e.target.value);
                            setInputPartnerName(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">사업자등록번호</p>
                    <input
                        defaultValue={partnerInfo.partner_registration}
                        onChange={(e) => {
                            setInputPartnerRegistration(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">전화번호</p>
                    <input
                        defaultValue={partnerInfo.partner_tel}
                        onChange={(e) => {
                            setInputPartnerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">홈페이지</p>
                    <input
                        placeholder="http://"
                        defaultValue={partnerInfo.partner_link}
                        onChange={(e) => {
                            setInputPartnerLink(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">담당자</p>
                    <input
                        defaultValue={partnerInfo.partner_manager}
                        onChange={(e) => {
                            setInputPartnerManager(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">담당자 연락처</p>
                    <input
                        defaultValue={partnerInfo.partner_manager_tel}
                        onChange={(e) => {
                            setInputPartnerManagerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div className="mb-3 self-center w-[100%]">
                    <p className="mb-2 text-left text-gray-500">업체 주소</p>
                    <input
                        defaultValue={partnerInfo.partner_address}
                        onChange={(e) => {
                            setInputPartnerAddress(e.target.value);
                        }}
                        type="text"
                        className="w-[100%] border text-[#8267d3] h-8 p-2"
                    />
                </div>
                <div style={{ width: "35%", display: "flex" }} className="mx-auto mt-3 mb-5">
                    <input
                        type="button"
                        value="제출하기"
                        onClick={() => {
                            updatePartnerInfo();
                        }}
                        className="self-center h-[40px] w-full rounded-md bg-[#A383FF] text-white mt-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default PartnerInfo;
