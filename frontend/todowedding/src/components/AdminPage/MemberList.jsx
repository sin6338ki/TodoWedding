/**
 * 관리자 페이지 - 회원 조회
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */

import axios from "axios";
import React from "react";

const MemberList = ({ members, setMembers, findAllMember }) => {
    //회원 검색
    const searchMember = () => {
        const input = document.getElementById("searchMemberInput").value;
        console.log("input : ", input);
        axios
            .get(`http://172.30.1.9:8085/admin/member?keyword=${input}`)
            .then((res) => {
                console.log("회원 검색 response : ", res.data);
                setMembers(res.data);
                document.getElementById("searchMemberInput").value = "";
            })
            .catch((err) => {
                console.log("회원 검색 error : ", err);
            });
    };

    return (
        <div>
            <div className="text-left text-xl font-bold mt-2 p-3 mx-4 border-b">회원 리스트</div>
            <div className="flex flex-row my-4 mx-4" style={{justifyContent:"center"}}>
                <h5 className="align-middle pt-2 text-xs">회원 검색</h5>
                <input
                    type="text"
                    id="searchMemberInput"
                    className="border border-[#465973] ml-3 pl-2 align-middle text-xs"
                    style={{width:"50%"}}
                ></input>
                <button
                    className="bg-[#465973] w-10 text-white text-xs"
                    onClick={() => {
                        searchMember();
                    }}
                >
                    검색
                </button>
                <button
                    className="ml-3 text-xs text-[#465973]"
                    onClick={() => {
                        findAllMember();
                    }}
                >
                    전체 회원
                </button>
            </div>
            <div className="grid grid-cols-12 mx-2 pt-3 mb-5">
                <div className="text-center font-bold col-span-1 text-xs">NO</div>
                <div className="text-center font-bold col-span-3 text-xs">닉네임</div>
                <div className="text-center font-bold col-span-4 text-xs">email</div>
                <div className="text-center font-bold col-span-2 text-xs">연령대</div>
                <div className="text-center font-bold col-span-2 text-xs">성별 </div>
                {members.map((member, idx) => {
                    return (
                        <>
                            <div className="text-center col-span-1 mt-2 text-xs">{idx + 1}</div>
                            <div className="text-center col-span-3 mt-2 text-xs">{member.nickname}</div>
                            <div className="text-center col-span-4 mt-2 text-xs">
                                {member.e_mail ? member.e_mail : "동의안함"}
                            </div>
                            <div className="text-center col-span-2 mt-2 text-xs">
                                {member.age_range ? member.age_range : "동의안함"}
                            </div>
                            <div className="text-center col-span-2 mt-2 text-xs">
                                {member.gender ? member.gender : "동의안함"}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default MemberList;
