/**
 * Admin page 업체 정보 변경 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoBg from "../../assets/images/Logo/Todo_BG.png";
import axios from "axios";

const PartnerInfo = () => {
    const location = useLocation();
    const [partnerSeq, setPartnerSeq] = useState();
    const navigate = useNavigate();

    const [partnerInfo, setPartnerInfo] = useState({});

    const [partnerName, setPartnerName] = useState();
    const [inputPartnerName, setInputPartnerName] = useState(partnerName);

    const [partnerRegistration, setPartnerRegistration] = useState();
    const [inputPartnerRegistration, setInputPartnerRegistration] = useState(partnerRegistration);

    const [partnerTel, setPartnerTel] = useState();
    const [inputPartnerTel, setInputPartnerTel] = useState(partnerTel);

    const [partnerLink, setPartnerLink] = useState();
    const [inputPartnerLink, setInputPartnerLink] = useState(partnerLink);

    const [partnerManager, setPartnerManager] = useState();
    const [inputPartnerManager, setInputPartnerManager] = useState(partnerManager);

    const [partnerManagerTel, setPartnerManagerTel] = useState();
    const [inputPartnerManagerTel, setInputPartnerManagerTel] = useState(partnerManagerTel);

    const [partnerAddress, setPartnerAddress] = useState();
    const [inputPartnerAddress, setInputPartnerAddress] = useState(partnerAddress);

    const [partnerUpdateDto, setPartnerUpdateDto] = useState();

    useEffect(() => {
        const newPartnerSeq = location.state.partnerSeq;
        setPartnerSeq(newPartnerSeq);
        //업체 정보 조회
        findPartnerInfo(newPartnerSeq);
    }, [location]);

    //업체 정보 조회 메서드
    const findPartnerInfo = (partnerSeq) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/partner/info/${partnerSeq}`)
            .then((res) => {
                const data = res.data;
                setPartnerInfo(data);
                setPartnerName(data.partner_name);
                setPartnerRegistration(data.partner_registration);
                setPartnerTel(data.partner_tel);
                setPartnerLink(data.partner_link);
                setPartnerManager(data.partner_manager);
                setPartnerManagerTel(data.partner_manager_tel);
                setPartnerAddress(data.partner_address);
            })
            .catch((err) => {
                console.log("업체 정보 조회 err : ", err);
            });
    };

    //업체 정보 변경
    useEffect(() => {
        setPartnerUpdateDto({
            partnerSeq: partnerSeq,
            partnerPw: partnerInfo.partner_pw,
            partnerName: inputPartnerName || partnerInfo.partner_name,
            partnerRegistration: inputPartnerRegistration || partnerRegistration,
            partnerTel: inputPartnerTel || partnerTel,
            partnerLink: inputPartnerLink || partnerLink,
            partnerManager: inputPartnerManager || partnerManager,
            partnerManagerTel: inputPartnerManagerTel || partnerManagerTel,
            partnerAddress: inputPartnerAddress || partnerAddress,
        });
    }, [
        partnerSeq,
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
            .delete(`${process.env.REACT_APP_API_URL}/partner/${partnerSeq}`)
            .then((res) => {
                console.log("deletepartner response", res.data);
                if (res.data === "success") {
                    alert("회원 정보 삭제가 완료되었습니다.!");
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
                            value={partnerInfo.partner_id || ""}
                            disabled
                            type="text"
                            className="w-[480px] border text-[#A383FF] h-8 p-2"
                        ></input>
                    </div>
                    <div className="mb-3 self-center w-[480px]">
                        <p className="mb-2 text-left text-gray-500">비밀번호</p>
                        <input
                            defaultValue={partnerInfo.partner_pw || ""}
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
                                setInputPartnerName(e.target.value);
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
                                setInputPartnerRegistration(e.target.value);
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
                                setInputPartnerTel(e.target.value);
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
                                setInputPartnerLink(e.target.value);
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
                                setInputPartnerManager(e.target.value);
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
                                setInputPartnerManagerTel(e.target.value);
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
                                setInputPartnerAddress(e.target.value);
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
