/**
 * 파트너 전용 페이지 - 채팅방 리스트
 * 작성자 : 신지영
 * 작성일 : 2023.09.11
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoBg from "../../assets/images/Todo_BG.png";

const Partner = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.Auth.token);
    const [resultFindChatRoom, setResultFindChatRoom] = useState();

    //처음 화면 렌더링시 => 리덕스에서 값 (partner_seq) 가져오기
    useEffect(() => {
        findChatRoom();
    }, [token]);

    //채팅방 조회하기 이벤트
    const findChatRoom = () => {
        token &&
            axios
                .get(`http://localhost:8085/chat/${token.userSeq}`)
                .then((res) => {
                    console.log("채팅방 조회 response : ", res.data);
                    setResultFindChatRoom(res.data);
                })
                .catch((err) => {
                    console.log("채팅방 조회 error : ", err);
                });
    };

    //입장 버튼 클릭시 발생 이벤트
    const enterToChat = (chatRoomSeq, partnerSeq, memberSeq) => {
        console.log("enterToChat chatRoomSeq : ", chatRoomSeq);
        navigate(`/todowedding/chat-room/${chatRoomSeq}`, {
            state: { partnerSeq: partnerSeq, memberSeq: memberSeq },
        });
    };

    return (
        <div>
            <div className="flex relative w-[180px] my-5 mx-auto">
                <img src={TodoBg} className="bg-cover bg-center w-full h-full self-center"></img>
                <div className="text-center font-bold absolute w-full h-full mt-2">채팅방 리스트</div>
            </div>
            <div className="flex flex-row m-10 justify-between">
                <div>NO</div>
                <div>닉네임</div>
                <div>마지막 대화 날짜</div>
                <div>입장</div>
            </div>
            {resultFindChatRoom &&
                resultFindChatRoom.map((chatRoom, idx) => {
                    return (
                        <div key={idx} className="flex flex-row m-10 justify-between">
                            <div>{idx + 1}</div>
                            <div>{chatRoom.nickname}</div>
                            <div>{chatRoom.chatting_create_dt}</div>
                            <button
                                onClick={() => {
                                    enterToChat(chatRoom.chat_room_seq, chatRoom.partner_seq, chatRoom.member_seq);
                                }}
                            >
                                입장
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default Partner;
