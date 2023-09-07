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

    //불러와지는 Data(기존 채팅방 존재여부 확인)가 있다면,
    //기존 채팅방 구독
    //없다면 새로운 채팅방 생성 및 구독

    useEffect(() => {
        //최초 렌더링시 웹소켓 연결
        connect();
        return () => disConnect();
    }, [location]);

    //웹소켓 연결
    const connect = () => {
        try {
            const client = new StompJs.Client({
                brokerURL: "ws://localhost:8085/gs-guide-websocket",
                connectHeaders: {
                    //header에 채팅방과 참가자 정보 함께 전송
                    chatRoomSeq: location.pathname.split("/")[3],
                    memberSeq: locationData.memberSeq,
                    partnerSeq: locationData.partnerSeq,
                },
                debug: function (str) {
                    console.log("웹소켓 연결 debug : ", str);
                },
            });

            //해당 채팅방 구독
            client.onConnect = () => {
                client.subscribe("/topic/" + chatRoomSeq, callback);
            };

            client.activate(); //클라이언트 활성화
        } catch (err) {
            console.log("websocket 연결 error : ", error);
        }
    };

    //callback 함수
    const callback = (message) => {
        if (message.body) {
            let msg = JSON.parse(message.body);
        }
    };

    //연결해제
    const disConnect = () => {
        if (locationData.memberSeq == null) {
            return;
        }
        client.deactive();
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
