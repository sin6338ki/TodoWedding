import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoBg from "../../assets/images/Todo_BG.png";

const PartnerInfo = () => {
    const token = useSelector((state) => state.Auth.token);
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
        axios
            .get(`http://localhost:8085/partner/${token.userSeq}`)
            .then((res) => {
                console.log("업체 정보 조회 result : ", res.data);
                setPartnerInfo(res.data);
            })
            .catch((err) => {
                console.log("업체 정보 조회 err : ", err);
            });
    }, []);

    useEffect(() => {
        console.log("partnerUpdateDto", partnerUpdateDto);
    }, [partnerUpdateDto]);

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

    //회원 정보 업데이트
    const updatePartnerInfo = () => {
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

        axios
            .put(`http://localhost:8085/partner/${token.userSeq}`, partnerUpdateDto)
            .then((res) => {
                console.log("기업 회원 정보 update response", res.data);
            })
            .catch((err) => {
                console.log("기업 회원 정보 update error", err);
                alert("회원 정보 수정에 실패했습니다.");
            });
    };

    return (
        <div>
            <div className="flex relative w-[180px] mt-5 mx-auto">
                <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                <div className="text-center font-bold absolute w-full h-full mt-2">업체 정보 수정하기</div>
            </div>
            <div className="ml-10 mt-10 w-[480px] flex flex-col">
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">아이디</p>
                    <input
                        value={partnerInfo.partner_id}
                        disabled
                        type="text"
                        className="w-[480px] border text-[#A383FF] h-8 p-2"
                    ></input>
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">비밀번호</p>
                    <input
                        onChange={(e) => {
                            setPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">비밀번호 확인</p>
                    <p id="checkPw"></p>
                    <input
                        onChange={(e) => {
                            setCheckPartnerPw(e.target.value);
                        }}
                        type="password"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">기업명</p>
                    <input
                        defaultValue={partnerInfo.partner_name}
                        onChange={(e) => {
                            setPartnerName(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">사업자등록번호</p>
                    <input
                        defaultValue={partnerInfo.partner_registration}
                        onChange={(e) => {
                            setPartnerRegistration(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">전화번호</p>
                    <input
                        defaultValue={partnerInfo.partner_tel}
                        onChange={(e) => {
                            setPartnerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">홈페이지</p>
                    <input
                        placeholder="http://"
                        defaultValue={partnerInfo.partner_link}
                        onChange={(e) => {
                            setPartnerLink(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    ></input>
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">담당자</p>
                    <input
                        defaultValue={partnerInfo.partner_manager}
                        onChange={(e) => {
                            setPartnerManager(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">담당자 연락처</p>
                    <input
                        defaultValue={partnerInfo.partner_manager_tel}
                        onChange={(e) => {
                            setPartnerManagerTel(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left text-gray-400">업체 주소</p>
                    <input
                        defaultValue={partnerInfo.partner_address}
                        onChange={(e) => {
                            setPartnerAddress(e.target.value);
                        }}
                        type="text"
                        className="w-[480px] border h-8 p-2 text-[#A383FF] "
                    />
                </div>
                <div>
                    <input
                        type="button"
                        value="SUBMIT"
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
