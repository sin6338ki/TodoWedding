/**
 * Admin page 업체 정보 변경 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoBg from "../../assets/images/Todo_BG.png";
import axios from "axios";

const PartnerInfo = () => {
    const location = useLocation();
    const [partnerSeq, setPartnerSeq] = useState();
    const navigate = useNavigate();

    const [partnerInfo, setPartnerInfo] = useState({});
    const [partnerName, setPartnerName] = useState();
    const [partnerRegistration, setPartnerRegistration] = useState();
    const [partnerTel, setPartnerTel] = useState();
    const [partnerLink, setPartnerLink] = useState();
    const [partnerManager, setPartnerManager] = useState();
    const [partnerManagerTel, setPartnerManagerTel] = useState();
    const [partnerAddress, setPartnerAddress] = useState();
    const [partnerUpdateDto, setPartnerUpdateDto] = useState();

    useEffect(() => {
        setPartnerSeq(location.state.partnerSeq);
        console.log("partnerSeq : ", partnerSeq);
        //업체 정보 조회
        findPartnerInfo(partnerSeq);
    }, [location, partnerSeq]);

    //업체 정보 조회 메서드
    const findPartnerInfo = (partnerSeq) => {
        axios
            .get(`http://172.30.1.9:8085/partner/info/${partnerSeq}`)
            .then((res) => {
                console.log("업체 정보 조회 result : ", res.data);
                setPartnerInfo(res.data);
            })
            .catch((err) => {
                console.log("업체 정보 조회 err : ", err);
            });
    };

    //업체 정보 변경
    useEffect(() => {
        setPartnerUpdateDto({
            partnerSeq: partnerSeq,
            partnerName: partnerInfo.partner_name,
            partnerPw: partnerInfo.partner_pw,
            partnerRegistration: partnerRegistration,
            partnerTel: partnerTel,
            partnerLink: partnerLink,
            partnerManager: partnerManager,
            partnerManagerTel: partnerManagerTel,
            partnerAddress: partnerAddress,
        });
    }, [
        partnerSeq,
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
            .put(`http://172.30.1.9:8085/partner`, partnerUpdateDto)
            .then((res) => {
                console.log("기업 회원 정보 update response", res.data);
                alert("회원 정보 수정이 완료되었습니다.!");
                navigate("/todowedding/admin");
            })
            .catch((err) => {
                console.log("기업 회원 정보 update error", err);
                alert("회원 정보 수정에 실패했습니다.");
            });
    };

    //업체 정보 삭제
    const deletePartner = () => {
        axios
            .delete(`http://172.30.1.9:8085/partner/${partnerSeq}`)
            .then((res) => {
                console.log("deletepartner response", res.data);
                if (res.data === "success") {
                    navigate("/todowedding/admin");
                }
            })
            .catch((err) => {
                console.log("deletePartner error", err);
            });
    };

    return (
        <div>
            <div>
                <div className="flex relative w-[180px] mt-5 mx-auto">
                    <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                    <div className="text-center font-bold absolute w-full h-full mt-2">업체 정보 수정하기</div>
                </div>
                <div className="ml-10 mt-10 w-[480px] flex flex-col">
                    <div className="mb-3 self-center w-[480px]">
                        <p className="mb-2 text-left text-gray-500">아이디</p>
                        <input
                            value={partnerInfo.partner_id}
                            disabled
                            type="text"
                            className="w-[480px] border text-[#A383FF] h-8 p-2"
                        ></input>
                    </div>
                    <div className="mb-3 self-center w-[480px]">
                        <p className="mb-2 text-left text-gray-500">비밀번호</p>
                        <input
                            defaultValue={partnerInfo.partner_pw}
                            disabled
                            type="password"
                            className="w-[480px] border h-8 p-2 text-[#A383FF] "
                        ></input>
                    </div>
                    <div className="mb-3 self-center w-[480px]">
                        <p className="mb-2 text-left text-gray-500">기업명</p>
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
                        <p className="mb-2 text-left text-gray-500">사업자등록번호</p>
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
                        <p className="mb-2 text-left text-gray-500">전화번호</p>
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
                        <p className="mb-2 text-left text-gray-500">홈페이지</p>
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
                        <p className="mb-2 text-left text-gray-500">담당자</p>
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
                        <p className="mb-2 text-left text-gray-500">담당자 연락처</p>
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
                        <p className="mb-2 text-left text-gray-500">업체 주소</p>
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
                            value="제출하기"
                            onClick={() => {
                                updatePartnerInfo();
                            }}
                            className="self-center h-[40px] w-full rounded-md bg-[#A383FF] text-white mt-2"
                        />
                        <input
                            type="button"
                            value="삭제하기"
                            onClick={() => {
                                deletePartner();
                            }}
                            className="self-center h-[40px] w-full rounded-md bg-gray-400 text-white mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerInfo;
