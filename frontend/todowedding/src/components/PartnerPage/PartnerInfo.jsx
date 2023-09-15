import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PartnerInfo = () => {
    const token = useSelector((state) => state.Auth.token);

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

    useEffect(() => {
        //업체 정보 조회
        axios
            .get(`http://localhost:8085/partner/${token.userSeq}`)
            .then((res) => {
                console.log("업체 정보 조회 result : ", res.data);
            })
            .catch((err) => {
                console.log("업체 정보 조회 err : ", err);
            });
    }, []);
    return (
        <div>
            <div>업체 정보 수정하기</div>
            <div className="ml-10 mt-10 w-[480px] flex flex-col">
                <div className="mb-3 self-center w-[480px]">
                    <p className="mb-2 text-left">아이디</p>
                    <input
                        onChange={(e) => {
                            setPartnerId(e.target.value);
                        }}
                        type="text"
                        className="w-[380px] border h-8 p-2"
                    ></input>
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
                <div>
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
        </div>
    );
};

export default PartnerInfo;
