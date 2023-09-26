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
    const [total, setTotal] = useState();

    //chart 정보
    const [maleCnt, setMaleCnt] = useState(0);
    const [femaleCnt, setFemaleCnt] = useState(0);
    const [hallCnt, setHallCnt] = useState(0);
    const [studioCnt, setStudioCnt] = useState(0);
    const [twentyCnt, setTwentyCnt] = useState(0);
    const [thirtyCnt, setThirtyCnt] = useState(0);
    const [fourtyCnt, setFourtyCnt] = useState(0);

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
        axios.get(`http://172.30.1.9:8085/admin/${token.userSeq}`).then((res) => {
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
            .get("http://172.30.1.9:8085/member")
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
            .get("http://172.30.1.9:8085/partner")
            .then((res) => {
                console.log("전체 업체 조회", res.data);
                setPartners(res.data);
                setTotal(res.data.length);
            })
            .catch((err) => {
                console.log("전체 업체 조회 에러", err);
            });

        console.log("total : ", total);
    };

    //User 성별 조회
    const chartMember = () => {
        let genderMale = 0;
        let genderFemail = 0;
        members.forEach((member) => {
            if (member.gender === "male") {
                genderMale++;
            } else {
                genderFemail++;
            }
            setMaleCnt(genderMale);
            setFemaleCnt(genderFemail);
        });
    };

    //User 연령대 조회
    const chartAgeMember = () => {
        let twenties = 0;
        let thirty = 0;
        let fourty = 0;

        members.forEach((age) => {
            if (age.age_range === "20~29") {
                twenties++;
            } else if (age.age_range === "30~39") {
                thirty++;
            } else {
                fourty++;
            }
        });

        setTwentyCnt(twenties);
        setThirtyCnt(thirty);
        setFourtyCnt(fourty);
    };

    //Partner 유형 조회
    const chartPartner = () => {
        let hall = 0;
        let studio = 0;
        partners.forEach((partner) => {
            if (partner.partner_code === "웨딩홀") {
                hall++;
            } else {
                studio++;
            }

            setHallCnt(hall);
            setStudioCnt(studio);
        });
    };

    //파트너 정보, 유저 정보 불러왔을 때 chart 정보 이벤트 실행
    useEffect(() => {
        chartMember();
        console.log("Member Chart Cnt (male, female) : ", maleCnt, femaleCnt);
        chartPartner();
        console.log("Partner Chart Cnt (hall, studio) : ", hallCnt, studioCnt);
        chartAgeMember();
    }, [partners, members]);

    return (
        <div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 mt-3  mx-1 text-[#A383FF]">
                <Tab eventKey="home" title="통계">
                    <Dashboard
                        partners={partners}
                        members={members}
                        maleCnt={maleCnt}
                        femaleCnt={femaleCnt}
                        twentyCnt={twentyCnt}
                        thirtyCnt={thirtyCnt}
                        fourtyCnt={fourtyCnt}
                        hallCnt={hallCnt}
                        studioCnt={studioCnt}
                    />
                </Tab>
                <Tab eventKey="profile" title="회원 리스트">
                    <MemberList members={members} setMembers={setMembers} findAllMember={findAllMember} />
                </Tab>
                <Tab eventKey="contact" title="제휴 업체 리스트">
                    <PartnerList
                        partners={partners}
                        setPartners={setPartners}
                        findAllPartner={findAllPartner}
                        total={total}
                    />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Index;
