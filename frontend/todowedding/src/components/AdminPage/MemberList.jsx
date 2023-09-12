/**
 * 관리자 페이지 - 회원 조회
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */

import axios from "axios";
import React, { useEffect, useState } from "react";

const MemberList = () => {
    const [members, setMembers] = useState([]);

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
            <h3>회원 리스트</h3>
            <h5>회원 검색</h5>
            <button>?</button>
            <div>
                <div>
                    <span>NO</span>
                    <span>닉네임</span>
                    <span>email</span>
                    <span>연령대</span>
                    <span>성별</span>
                </div>
                {members.map((member, idx) => {
                    return (
                        <div key={idx}>
                            <span>{idx + 1}</span>
                            <span>{member.nickname}</span>
                            <span>{member.e_mail}</span>
                            <span>{member.age_range}</span>
                            <span>{member.gender}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemberList;
