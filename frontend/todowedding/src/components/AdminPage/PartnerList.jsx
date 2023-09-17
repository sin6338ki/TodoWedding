/**
 * 관리자 전용 페이지
 * 제휴업체 리스트 컴포넌트
 * 작성자 : 신지영
 * 작성일 : 2023.09.17
 */
import React from "react";

const PartnerList = ({ partners }) => {
    return (
        <div>
            <div className="text-left text-2xl font-bold w-full mt-2 p-3 border-b">업체 리스트</div>
            <div className="flex flex-row p-3 mt-2 ">
                <h5 className="align-middle pt-2 text-xs">업체 검색</h5>
                <input type="text" className="border border-[#9F7FFC] ml-3 align-middle text-xs"></input>
                <button className="bg-[#9F7FFC] w-10 text-white text-xs">검색</button>
            </div>
            <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-1 ">NO</div>
                <div className="text-center font-bold col-span-2 ">아이디</div>
                <div className="text-center font-bold col-span-3 ">업체명</div>
                <div className="text-center font-bold col-span-3">연락처</div>
                <div className="text-center font-bold col-span-3">사업자등록번호</div>
                {partners.map((partner, idx) => {
                    return (
                        <>
                            <div className="text-center col-span-1 mt-1 text-xs">{idx + 1}</div>
                            <div className="text-center col-span-2 mt-1 text-xs">{partner.partner_id}</div>
                            <div className="text-center col-span-3 mt-2 text-xs">{partner.partner_name}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{partner.partner_tel}</div>
                            <div className="text-center col-span-3 mt-1 text-xs">{partner.partner_registration}</div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default PartnerList;
