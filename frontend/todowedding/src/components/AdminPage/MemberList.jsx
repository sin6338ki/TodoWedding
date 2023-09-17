/**
 * 관리자 페이지 - 회원 조회
 * 작성자 : 신지영
 * 작성일 : 2023.09.12
 */

import React from "react";

const MemberList = ({ members }) => {
    return (
        <div>
            <div className="text-left text-2xl font-bold w-full mt-2 p-3 border-b">회원 리스트</div>
            <div className="flex flex-row p-3 mt-2">
                <h5 className="align-middle pt-2 text-xs">회원 검색</h5>
                <input type="text" className="border border-[#9F7FFC] ml-3 align-middle text-xs"></input>
                <button className="bg-[#9F7FFC] w-10 text-white text-xs">검색</button>
            </div>
            <div className="grid grid-cols-12 ml-3 pt-3 mb-5">
                <div className="text-center font-bold col-span-1 ">NO</div>
                <div className="text-center font-bold col-span-3 ">닉네임</div>
                <div className="text-center font-bold col-span-4 ">email</div>
                {/* email 추가 */}
                <div className="text-center font-bold col-span-2">연령대</div>
                {/* 연령대 추가 */}
                <div className="text-center font-bold col-span-2">성별 </div>
                {members.map((member, idx) => {
                    return (
                        <>
                            <div className="text-center col-span-1 mt-1">{idx + 1}</div>
                            <div className="text-center col-span-3 mt-1">{member.nickname}</div>
                            <div className="text-center col-span-4 mt-1">
                                {member.e_mail ? member.e_mail : "동의안함"}
                            </div>
                            <div className="text-center col-span-2 mt-1">
                                {member.age_range ? member.age_range : "동의안함"}
                            </div>
                            <div className="text-center col-span-2 mt-1">
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
