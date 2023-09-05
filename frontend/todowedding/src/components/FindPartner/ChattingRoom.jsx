import React, { useEffect, useRef } from "react";
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
    const location = useLocation();
    const data = location.data;
    const client = useRef({});

    useEffect(() => {
        //창이 띄어지면 소켓 연결
        connect();
    }, []);

    //소켓 연결 메서드
    let socket = null;
    let isStomp = false;

    //소켓 연결
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: "ws://localhost:8085/stompTest",
            // webSocketFactory: () => new SockJS("/websocket"),
            onConnect: () => {
                console.log("socket connect success!");
            },
            onStompError: (frame) => {
                console.log("onStompError : ", frame);
            },
        });
        client.current.activate();

        // return disconnect();
    };

    //소켓 연결 해제
    const disconnect = () => {
        client.current.deactivate();
    };

    //구독
    const subscribe = () => {
        client.current.subscribe("/sub/chat", ({ body }) => {
            JSON.parse(body);
        });
    };

    //발행
    const publish = (message) => {
        if (!client.current.connected) {
            return;
        }

        client.current.publish({
            destination: "pub/chat",
            body: JSON.stringify({ message }),
        });
    };

    const sendMessage = (evt) => {
        evt.preventDefault();
        if (!isStomp && socket.readyState !== 1) return;

        let message = document.getElementById("message").value;

        if (isStomp) {
            socket.send(
                "/TTT",
                {},
                JSON.stringify({
                    chatRoomdata: data,
                    message: message,
                })
            );
        } else {
            socket.send(message);
        }
    };

    return (
        <div>
            {/* 채팅목록 불러와서 띄울 예정 */}
            <div>채팅 목록</div>
            <div>
                <input id="message" value="상담신청합니다."></input>
                <button onClick={sendMessage}>보내기</button>
            </div>
        </div>
    );
};

export default ChattingRoom;
