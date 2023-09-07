import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { WebSocket } from "websocket";
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
    const chatRoomSeq = location.pathname.split("/")[3];
    const [content, setContent] = useState("");
    const memberSeq = 101;
    const [chatList, setChatList] = useState([]); // 채팅 기록

    // 클라이언트 상태 추가
    const [stompClient, setStompClient] = useState(null);

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
            const newClient = new StompJs.Client({
                brokerURL: "ws://localhost:8085/stomp-chat",
                connectHeaders: {
                    //header에 채팅방과 참가자 정보 함께 전송
                    chatRoomSeq: location.pathname.split("/")[3],
                    memberSeq: locationData.memberSeq,
                    partnerSeq: locationData.partnerSeq,
                },
                debug: function (str) {
                    console.log("웹소켓 연결 debug : ", str);
                },
                reconnectDelay: 5000, //자동재연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            // //해당 채팅방 구독
            newClient.onConnect = () => {
                newClient.subscribe(`/sub/chat/${chatRoomSeq}`, callback);
            };

            newClient.activate(); //클라이언트 활성화
            // changeClient(newClient);

            setStompClient(newClient);
        } catch (err) {
            console.log("websocket 연결 error : ", err);
        }
    };

    //callback 함수
    const callback = async (message) => {
        console.log("message : ", message.body);
        if (message.body) {
            let msg = JSON.parse(message.body);
            console.log("msg : ", msg);
            await setContent(msg);
            await setChatList((chats) => [...chats, msg]);
        }
    };

    //연결해제
    const disConnect = () => {
        if (locationData.memberSeq == null || !stompClient) {
            // stompClient 체크 추가
            return;
        }
        stompClient.deactivate();
    };

    //전송하기
    const send = () => {
        if (content === "" || !stompClient) {
            return;
        }

        console.log("propertied : ", chatRoomSeq, memberSeq, content);
        stompClient.publish({
            destination: "/pub/chat/" + chatRoomSeq,
            body: JSON.stringify({
                chattingCreateDt: new Date().toString(),
                chattingSender: memberSeq,
                chattingContents: content,
                chattingSenderType: "N",
            }),
        });
        setContent("");
        document.getElementById("messageInputBox").value = "";
    };

    // 내가 보낸 메시지, 받은 메시지에 각각의 스타일을 지정해 주기 위함
    const msgBox = () => {
        return chatList.map((item, idx) => {
            if (item.chattingSenderType != "N") {
                return (
                    <div key={idx}>
                        <div>
                            <span>{item.chattingContents}</span>
                        </div>
                        <span>{item.chattingCreateDt}</span>
                        <div>
                            <span>{item.chattingSender}</span>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={idx}>
                        <div>
                            <span>{item.chattingContents}</span>
                        </div>
                        <span>{item.chattingCreateDt}</span>
                        <div>
                            <span>{item.chattingSender}</span>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div>
            {/* 채팅목록 불러와서 띄울 예정 */}
            <div>
                <div id="menu">
                    <p>Welcome,</p>
                </div>
                <div>{msgBox()}</div>
                <input
                    id="messageInputBox"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    type="text"
                    className="border"
                ></input>
                <button
                    onClick={() => {
                        send();
                    }}
                >
                    메세지 보내기
                </button>
            </div>
        </div>
    );
};

export default ChattingRoom;
