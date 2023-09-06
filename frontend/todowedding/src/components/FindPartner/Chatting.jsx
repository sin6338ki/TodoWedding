import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * 채팅 테스트 페이지
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
const Chatting = () => {
    //페이지 이동시 데이터 함께 전달하기 위해 사용
    const navigate = useNavigate();

    //request 데이터 - 업체 고유번호, 멤버 고유번호
    const data = {
        partnerSeq: 123456,
        memberSeq: 123456789,
    };

    //상담 시작 클릭시 발생하는 이벤ㅌ
    const enterChat = () => {
        axios
            .post("http://localhost:8085/enter-chat", data)
            .then((res) => {
                console.log("response : ", res.data);
                //response 되면 실제 채팅 상담 페이지로 이동
                //페이지 이동시 data 함께 보낼 예정
                navigate("/todowedding/chat-room", {
                    state: {
                        partnerSeq: 123456,
                        memberSeq: 123456789,
                        chatRoomSeq: parseInt(res.data),
                    },
                });
            })
            .catch((err) => {
                console.log("error : ", err);
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
