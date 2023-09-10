/**
 * 파트너 전용 페이지 - 채팅방 리스트
 * 작성자 : 신지영
 * 작성일 : 2023.09.11
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Partner = () => {
    const { partnerLoginInfo } = useSelector((state) => state.partnerLoginInfo);
    const [partnerSeq, setPartnerSeq] = useState();
    const [partnerName, setPartnerName] = useState();
    const [resultFindChatRoom, setResultFindChatRoom] = useState();

    //처음 화면 렌더링시 => 리덕스에서 값 (partner_seq) 가져오기
    useEffect(() => {
        // console.log("partnerLoginInfo", partnerLoginInfo);
        const load = async () => {
            await setPartnerSeq(partnerLoginInfo.partner_seq);
            await setPartnerName(partnerLoginInfo.partner_name);
        };

        load();
        findChatRoom();
    }, []);

    //채팅방 조회하기 이벤트
    const findChatRoom = () => {
        axios
            .get(`http://localhost:8085/chat/${partnerSeq}`)
            .then((res) => {
                console.log("채팅방 조회 response : ", res.data);
                setResultFindChatRoom(res.data);
            })
            .catch((err) => {
                console.log("채팅방 조회 error : ", err);
            });
    };

    return (
        <div>
            <div>채팅방 리스트</div>
            <div>
                <span>NO</span>
                <span>1:1상담 신청 닉네임</span>
                <span>마지막 대화 날짜</span>
                <span>입장</span>
            </div>
            {resultFindChatRoom.map((chatRoom, idx) => {
                return (
                    <div key={idx}>
                        <span>{idx + 1}</span>
                        <span>{chatRoom.nickname}</span>
                        <span>{chatRoom.chat_room_create_dt}</span>
                        <button>입장</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Partner;
