import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 채팅 테스트 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
const Chatting = () => {
    //페이지 이동시 데이터 함께 전달하기 위해 사용
    const navigate = useNavigate();

    const memberSeq = 12345;
    const partnerSeq = 11111;
    const [chatRoomSeq, setChatRoomSeq] = useState();
    const [isChatroom, setIsChatRoom] = useState();

    //request 데이터 - 업체 고유번호, 멤버 고유번호
    const data = {
        memberSeq: memberSeq,
        chatRoomCreateDt: new Date(),
        partnerSeq: partnerSeq,
    };

    //상담 시작 클릭시 발생하는 이벤트
    const enterChat = () => {
        //기존 연결되어 있는 채팅방 유무 확인
        isAlivedChat();
        //기존 채팅방이 없다면 채팅방 만들기 진행, 있다면 채팅방으로 이동
        // isChatroom == 0 ? createChat() : moveToChat();
        isChatroom == "none" && createChat();
    };

    //채팅방 만드는 이벤트
    const createChat = () => {
        axios
            .post("http://localhost:8085/chat", data)
            .then((res) => {
                console.log("createChat response : ", res.data);
                setChatRoomSeq(res.data);
                isAlivedChat();
                // moveToChat();
            })
            .catch((err) => {
                console.log("createChat error : ", err);
            });
    };

    //채팅방 유무 확인 이벤트
    const isAlivedChat = () => {
        axios
            .get(`http://localhost:8085/chat/${memberSeq}/${partnerSeq}`)
            .then((res) => {
                console.log("채팅방 성공 유무 : ", res.data);
                setIsChatRoom(res.data);
            })
            .catch((err) => {
                console.log("채팅방 유무 확인 error : ", err);
            });
    };

    //채팅방으로 이동하는 이벤트
    const moveToChat = () => {
        //response 되면 실제 채팅 상담 페이지로 이동
        //페이지 이동시 data 함께 보낼 예정
        navigate(`/todowedding/chat-room/${chatRoomSeq}`, {
            state: {
                partnerSeq: partnerSeq,
                memberSeq: memberSeq,
            },
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
