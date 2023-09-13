import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import "../../tailwind.css";
import { useSelector } from "react-redux"; //redux 액션 실행
/*
 * 실제 채팅방 - 채팅목록 및 채팅 보낼 수 있는 창
 * 작성자 : 신지영
 * 작성일 : 2023.09.05, 13
 */

const ChattingRoom = () => {
    //useNavigate 활용하여 가져온 데이터 불러오기
    //- 채팅방 고유번호, 회원 고유번호, 업체 고유번호
    const location = useLocation();
    const locationData = location.state;
    const chatRoomSeq = location.pathname.split("/")[3];
    const [content, setContent] = useState("");
    const [chatList, setChatList] = useState([]); // 채팅 기록

    //로그인 유저 확인
    const token = useSelector((state) => state.Auth.token);

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
            console.log("로그인 접속자 확인", token.type, token.userNick);
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
            let chatting = await JSON.parse(message.body);
            console.log("chatting", chatting);
            await setContent(chatting);
            await setChatList((chats) => [...chats, chatting]);
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

        console.log("propertied : ", chatRoomSeq, token.userSeq, content, token.type, token.userNick);

        stompClient.publish({
            destination: "/pub/chat/" + chatRoomSeq,
            body: JSON.stringify({
                chattingCreateDt: new Date().toString(),
                chattingSender: token.userNick,
                chattingContents: content,
                chattingSenderType: token.type,
            }),
        });
        setContent("");
        document.getElementById("chatting-input-box").value = "";
    };

    // 내가 보낸 메시지, 받은 메시지에 각각의 스타일을 지정해 주기 위함
    const msgBox = () => {
        return chatList.map((item, idx) => {
            if (item.chattingSenderType != "member") {
                return (
                    <div key={idx}>
                        <div className="mt-3">
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
                    <div
                        key={idx}
                        className="shadow-md shadow-gray-400 border rounded-xl border-black mr-3 my-2 text-xs w-max"
                    >
                        <div className="mt-3 mr-5 text-right">
                            <span>{item.chattingContents}</span>
                        </div>
                        <div className="mt-1 mr-5 text-right">
                            <span>{item.chattingCreateDt}</span>
                        </div>
                        <div className="mt-1 mr-5 text-right">
                            <span>{item.chattingSender}</span>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div>
            <div
                id="chatting-container"
                className="mx-auto mt-10 flex flex-col border rounded-2xl border-black w-5/6 h-full"
            >
                <div
                    id="chatting-banner"
                    className="flex flex-col bg-[#D0CFFA] text-lg font-bold h-12 border rounded-t-2xl"
                >
                    <p className="text-left ml-9 mt-2">1:1 상담하기</p>
                </div>
                <div id="chatting-contents-container" className="flex flex-col h-[430px]">
                    {msgBox()}
                </div>
                <div id="chatting-input-container" className="flex flex-row bg-[#F4F4F4] h-32 rounded-b-2xl">
                    <div className="flex flex-col-reverse border-b border-black ml-5 mb-3 align-bottom basis-4/5">
                        <input
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                            id="chatting-input-box"
                            type="text"
                            className="appearance-none bg-transparent border-noneh-9 w-80 ml-2 mb-2 focus:outline-none  text-gray-700 border-[#9F7FFC]-500"
                        ></input>
                    </div>
                    <button
                        onClick={() => {
                            send();
                        }}
                        className="bg-[#C8C8C8] basis-1/5 mt-20 mb-3 mx-3 align-bottom rounded-md h-9"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChattingRoom;
