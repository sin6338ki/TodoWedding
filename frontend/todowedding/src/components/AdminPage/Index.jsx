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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** 콤포넌트 */
import Dashboard from "./Dashboard";
import MemberList from "./MemberList";
import PartnerList from "./PartnerList";

const Index = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const [partners, setPartners] = useState([]);
    const [members, setMembers] = useState([]);
    //Admin 계정이 아닐 경우 main 페이지로 이동

    useEffect(() => {
        const load = async () => {
            if (token) {
                await isAdmin();
                await findAllMember();
                await findAllPartner();
            } else {
                alert("관리자 계정으로 로그인이 필요합니다.");
                return navigate("/");
            }
        };

        load();
    }, []);

    //Admin 계정 여부 확인
    const isAdmin = () => {
        axios.get(`http://localhost:8085/admin/${token.userSeq}`).then((res) => {
            if (res.data != "Y") {
                alert("관리자 계정이 아닙니다. 관리자 계정으로 로그인 후 접속해 주세요.");
                navigate("/");
            } else {
            }
        });
    };

    //전체 멤버 조회
    const findAllMember = () => {
        axios
            .get("http://localhost:8085/member")
            .then((res) => {
                console.log("전체 멤버 조회", res.data);
                setMembers(res.data);
            })
            .catch((err) => {
                console.log("전체 멤버 조회 에러", err);
            });
    };

    //전체 업체 조회
    const findAllPartner = () => {
        axios
            .get("http://localhost:8085/partner")
            .then((res) => {
                console.log("전체 업체 조회", res.data);
                setPartners(res.data);
            })
            .catch((err) => {
                console.log("전체 업체 조회 에러", err);
            });
    };

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
