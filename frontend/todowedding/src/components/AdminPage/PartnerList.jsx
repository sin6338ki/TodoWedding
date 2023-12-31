/**
 * 관리자 전용 페이지
 * 제휴업체 리스트 컴포넌트
 * 작성자 : 신지영
 * 작성일 : 2023.09.17
 */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const PartnerList = ({ partners, setPartners, findAllPartner, total }) => {
    const navigate = useNavigate();

    //Pagination
    const limits = 10;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limits;

    //업체검색
    const searchPartner = () => {
        const input = document.getElementById("searchPartnerInput").value;
        axios
            .get(`${process.env.REACT_APP_API_URL}/admin/partner?keyword=${input}`)
            .then((res) => {
                setPartners(res.data);
                document.getElementById("searchPartnerInput").value = "";
            })
            .catch((err) => {
                console.log("업체 검색 error : ", err);
            });
    };

    //업체 정보 수정 및 삭제 페이지로 이동
    const updateInfo = (partnerSeq) => {
        navigate("/todowedding/admin/partner", { state: { partnerSeq: partnerSeq } });
    };

    return (
        <div>
            <div className="text-left text-xl font-bold mt-2 p-3 mx-4 border-b">업체 리스트</div>
            <div className="flex flex-row my-4 mx-4" style={{ justifyContent: "center" }}>
                <h5 className="align-middle pt-2 text-xs">업체 검색</h5>
                <input
                    type="text"
                    className="pl-2 border border-[#465973] ml-3 align-middle text-xs"
                    id="searchPartnerInput"
                    style={{ width: "50%" }}
                ></input>
                <button
                    className="bg-[#465973] w-10 text-white text-xs"
                    onClick={() => {
                        searchPartner();
                    }}
                >
                    검색
                </button>
                <button
                    className="ml-3 text-xs text-gray-400"
                    onClick={() => {
                        findAllPartner();
                    }}
                >
                    전체 업체
                </button>
            </div>
            <div className="grid grid-cols-9 mx-4 pt-3 mb-1">
                <div className="text-center font-bold col-span-1 text-xs">NO</div>
                <div className="text-center font-bold col-span-1 text-xs">구분</div>
                <div className="text-center font-bold col-span-2 text-xs">아이디</div>
                <div className="text-center font-bold col-span-2 text-xs">업체명</div>
                <div className="text-center font-bold col-span-3 text-xs">연락처</div>
                {/* <div className="text-center font-bold col-span-3 text-xs">사업자등록번호</div> */}
            </div>
            {partners.slice(offset, offset + limits).map((partner, idx) => {
                return (
                    <div
                        key={idx}
                        className="grid grid-cols-9 mx-4"
                        onClick={() => {
                            updateInfo(partner.partner_seq);
                        }}
                    >
                        <div className="text-center col-span-1 mt-3 text-xs">{idx + 1}</div>
                        <div className="text-center col-span-1 mt-3 text-xs">{partner.partner_code}</div>
                        <div className="text-center col-span-2 mt-3 text-xs">{partner.partner_id}</div>
                        <div className="text-center col-span-2 mt-3 text-xs">{partner.partner_name}</div>
                        <div className="text-center col-span-3 mt-3 text-xs">{partner.partner_tel}</div>
                        {/* <div className="text-center col-span-3 mt-3 text-xs">{partner.partner_registration}</div> */}
                    </div>
                );
            })}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                <Pagination limits={limits} page={page} setPage={setPage} total={total} />
            </div>
        </div>
    );
};

export default PartnerList;
