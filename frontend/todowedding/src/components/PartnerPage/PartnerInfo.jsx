import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoBg from "../../assets/images/Todo_BG.png";

const PartnerInfo = () => {
    const token = useSelector((state) => state.Auth.token);
    const navigate = useNavigate();
    const [partnerInfo, setPartnerInfo] = useState({});

    const [partnerPw, setPartnerPw] = useState();
    const [checkPartnerPw, setCheckPartnerPw] = useState();
    const [partnerName, setPartnerName] = useState();
    const [partnerRegistration, setPartnerRegistration] = useState();
    const [partnerTel, setPartnerTel] = useState();
    const [partnerLink, setPartnerLink] = useState();
    const [partnerManager, setPartnerManager] = useState();
    const [partnerManagerTel, setPartnerManagerTel] = useState();
    const [partnerAddress, setPartnerAddress] = useState();

    const [partnerUpdateDto, setPartnerUpdateDto] = useState();

    useEffect(() => {
        //업체 정보 조회
        findPartnerInfo();
        console.log("partnerUpdateDto", partnerUpdateDto);
    }, [partnerUpdateDto]);

    //업체 정보 조회 메서드
    const findPartnerInfo = () => {
        axios
            // .get(`http://172.30.1.7:8085/partner/info/${token.userSeq}`)
            .get(`http://172.30.1.7:8085/partner/info/${token.userSeq}`)
            .then((res) => {
                console.log("업체 정보 조회 result : ", res.data);
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
        console.log("first");
        if (checkPartnerPw != partnerPw) {
            document.getElementById("checkPw").innerText = "비밀번호가 틀립니다.";
            document.getElementById("checkPw").style.color = "red";
        } else {
            document.getElementById("checkPw").innerText = "";
        }
    }, [checkPartnerPw]);

    //업체 정보 변경
    useEffect(() => {
        setPartnerUpdateDto({
            partnerSeq: token.userSeq,
            partnerPw: partnerPw,
            partnerName: partnerName,
            partnerRegistration: partnerRegistration,
            partnerTel: partnerTel,
            partnerLink: partnerLink,
            partnerManager: partnerManager,
            partnerManagerTel: partnerManagerTel,
            partnerAddress: partnerAddress,
        });
    }, [
        token,
        partnerPw,
        partnerName,
        partnerRegistration,
        partnerTel,
        partnerLink,
        partnerManager,
        partnerManagerTel,
        partnerAddress,
    ]);

    //회원 정보 업데이트
    const updatePartnerInfo = () => {
        axios
            // .put(`http://172.30.1.7:8085/partner`, partnerUpdateDto)
            .put(`http://172.30.1.7:8085/partner`, partnerUpdateDto)
            .then((res) => {
                console.log("기업 회원 정보 update response", res.data);
                alert("회원 정보 수정이 완료되었습니다.!");
                navigate("/todowedding/partner");
            })
            .catch((err) => {
                console.log("기업 회원 정보 update error", err);
                alert("회원 정보 수정에 실패했습니다.");
            });
    };

    return (
        <div>
            <div className="flex relative w-[180px] mt-[120px] mx-auto">
                <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                <div className="text-center font-bold absolute w-full h-full mt-2">업체 정보 수정하기</div>
            </div>
            <div className="ml-5 mt-10 w-[380px] flex flex-col">
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">아이디</p>
                    <input
                        value={partnerInfo.partner_id}
                        disabled
                        type="text"
                        className="w-[380px] border text-[#A383FF] h-8 p-2"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">비밀번호</p>
                    <input
                        defaultValue={partnerInfo.partner_pw}
                        onChange={(e) => {
                            setPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">비밀번호 확인</p>
                    <p id="checkPw"></p>
                    <input
                        defaultValue={partnerInfo.partner_pw}
                        onChange={(e) => {
                            setCheckPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">기업명</p>
                    <input
                        defaultValue={partnerInfo.partner_name}
                        onChange={(e) => {
                            setPartnerName(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">사업자등록번호</p>
                    <input
                        defaultValue={partnerInfo.partner_registration}
                        onChange={(e) => {
                            setPartnerRegistration(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">전화번호</p>
                    <input
                        defaultValue={partnerInfo.partner_tel}
                        onChange={(e) => {
                            setPartnerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">홈페이지</p>
                    <input
                        placeholder="http://"
                        defaultValue={partnerInfo.partner_link}
                        onChange={(e) => {
                            setPartnerLink(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">담당자</p>
                    <input
                        defaultValue={partnerInfo.partner_manager}
                        onChange={(e) => {
                            setPartnerManager(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">담당자 연락처</p>
                    <input
                        defaultValue={partnerInfo.partner_manager_tel}
                        onChange={(e) => {
                            setPartnerManagerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[380px]">
                    <p className="mb-2 text-left text-gray-500">업체 주소</p>
                    <input
                        defaultValue={partnerInfo.partner_address}
                        onChange={(e) => {
                            setPartnerAddress(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div>
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
