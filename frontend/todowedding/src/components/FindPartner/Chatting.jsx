import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 채팅 테스트 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
const Chatting = () => {
    //페이지 이동시 데이터 함께 전달하기 위해 사용
    const navigate = useNavigate();

    const memberSeq = 101;
    const partnerSeq = 100;
    const [chatRoomSeq, setChatRoomSeq] = useState();

    //request 데이터 - 업체 고유번호, 멤버 고유번호
    const data = {
        memberSeq: memberSeq,
        chatRoomCreateDt: new Date(),
        partnerSeq: partnerSeq,
    };

    let isChatroom = "";

    //상담 시작 클릭시 발생하는 이벤트
    const enterChat = async () => {
        //기존 연결되어 있는 채팅방 유무 확인
        isChatroom = await isAlivedChat();

        if (isChatroom === "none") {
            const chatRoomSeq = await createChat();
            isChatroom = await isAlivedchat();
        }

        if (isChatroom !== "none") {
            moveToChat(isChatroom); // 생성된 채팅방 번호를 인자로 전달합니다.
        }
    };

    //채팅방 만드는 이벤트
    const createChat = async () => {
        console.log("createChat 실행 : ", isChatroom);
        try {
            const res = await axios.post("http://localhost:8085/chat", data);
            console.log("createChat response : ", res.data);
            setChatRoomSeq(res.data);
            return res.data;
        } catch (err) {
            console.log("createChat err : ", err);
        }
    };

    //채팅방 유무 확인 이벤트
    const isAlivedChat = async () => {
        try {
            const res = await axios.get(`http://localhost:8085/chat/${memberSeq}/${partnerSeq}`);
            console.log("isAlivedChat 채팅방 유무 : ", res.data);

            // 채팅방이 없으면 "none"을 반환하도록 가정합니다.
            return res.data === "none" ? "none" : res.data;
        } catch (err) {
            console.log("채팅방 유무 확인 error : ", err);

            // 에러 발생 시 "none"을 반환합니다.
            return "err";
        }
    };

    //채팅방으로 이동하는 이벤트
    const moveToChat = (chatRoomSeq) => {
        //response 되면 실제 채팅 상담 페이지로 이동
        //페이지 이동시 data 함께 보낼 예정
        navigate(`/todowedding/chat-room/${chatRoomSeq}`, {
            state: { partnerSeq: partnerSeq, memberSeq: memberSeq },
        });
    };

    return (
        <div>
            <input placeholder="상담을 시작하세요"></input>
            <button onClick={enterChat}>상담시작</button>
        </div>
    );
};

export default Chatting;
