/**
 * 관리자페이지 index 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.17
 */
import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import axios from "axios";

/** 콤포넌트 */
import Dashboard from "./Dashboard";
import MemberList from "./MemberList";
import PartnerList from "./PartnerList";

const Index = () => {
    const [partners, setPartners] = useState([]);
    const [members, setMembers] = useState([]);

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

    useEffect(() => {
        axios
            .get("http://localhost:8085/member")
            .then((res) => {
                console.log("전체 멤버 조회", res.data);
                setMembers(res.data);
            })
            .catch((err) => {
                console.log("전체 멤버 조회 에러", err);
            });
    }, []);

    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 mt-1 text-[#A383FF]">
                <Tab eventKey="home" title="통계">
                    <Dashboard partners={partners} members={members} />
                </Tab>
                <Tab eventKey="profile" title="회원 리스트">
                    <MemberList members={members} />
                </Tab>
                <Tab eventKey="contact" title="제휴 업체 리스트">
                    <PartnerList partners={partners} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Index;
