import React, { useEffect, useState } from "react";
import axios from "axios";

const PartnerList = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8085/partner")
            .then((res) => {
                console.log("전체 멤버 조회", res.data);
                setPartners(res.data);
            })
            .catch((err) => {
                console.log("전체 멤버 조회 에러", err);
            });
    }, []);
    return (
        <div>
            <h3>업체 리스트</h3>
            <h5>업체 검색</h5>
            <button>?</button>
            <div>
                <div>
                    <span>업체 아이디</span>
                    <span>업체명</span>
                    <span>업체 연락처</span>
                    <span>업체 등록일</span>
                </div>
                {partners.map((partner, idx) => {
                    return (
                        <div key={idx}>
                            <span>{idx + 1}</span>
                            <span>{partner.partner_id}</span>
                            <span>{partner.partner_name}</span>
                            <span>{partner.partner_tel}</span>
                            <span>{partner.partner_registration_dt}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PartnerList;
