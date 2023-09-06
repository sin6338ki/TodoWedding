import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

/*
 * 실제 채팅방 - 채팅목록 및 채팅 보낼 수 있는 창
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */

const ChattingRoom = () => {
    //useNavigate 활용하여 가져온 데이터 불러오기
    //- 채팅방 고유번호, 회원 고유번호, 업체 고유번호
    const location = useLocation();
    const locationData = location.state;
    const [content, setContent] = useState("");

    useEffect(() => {
        wsSubscribe();
        return () => wsDisconnect();
    }, []);

    //불러와지는 Data(기존 채팅방 존재여부 확인)가 있다면,
    //기존 채팅방 구독
    //없다면 새로운 채팅방 생성 및 구독
    useEffect(() => {
        console.log("locationData : ", locationData);
    }, [locationData]);

    //웹소켓 연결
    const client = new StompJs.Client({
        brokerURL: "ws://localhost:8085/gs-guide-websocket",
        connectHeaders: {
            //header에 채팅방과 참가자 정보 함께 전송
            chatRoomSeq: locationData.chatRoomSeq,
            memberSeq: locationData.memberSeq,
            partnerSeq: locationData.partnerSeq,
        },
        debug: function (str) {
            console.log("웹소켓 연결 debug : ", str);
        },
    });

    client.activate();

    const message = {
        chattingCreateDt: Date.now(),
        chattingSender: locationData.memberSeq,
        chattingContents: content,
        chatRoomReq: locationData.chatRoomSeq,
        chattingSenderType: "Y",
    };

    const sendMessage = () => {
        console.log("sendMessage : ", client.connected);
        if (!client.connected) return;

        client.publish({
            destination: "/app/hello",
            body: JSON.stringify({
                message: message,
            }),
        });
    };

    const wsSubscribe = () => {
        client.onConnect = () => {
            client.subscribe(
                "/topic/message",
                (msg) => {
                    const newMessage = JSON.parse(msg.body).message;
                    setContent(newMessage);
                },
                { id: locationData.chatRoomSeq }
            );
        };
    };

    const wsDisconnect = () => {
        client.deactivate();
    };

    return (
        <div>
            {/* 채팅목록 불러와서 띄울 예정 */}
            <div>
                <div id="menu">
                    <p>Welcome,</p>
                </div>
                <div>{content}</div>
                <button
                    onClick={() => {
                        sendMessage();
                    }}
                >
                    메세지 보내기
                </button>
            </div>
        </div>
    );
};

export default ChattingRoom;
