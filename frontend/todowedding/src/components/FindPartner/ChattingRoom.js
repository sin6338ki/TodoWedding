import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import "../../tailwind.css";
import { useSelector } from "react-redux"; //redux 액션 실행
import axios from "axios";

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
    const navigate = useNavigate();
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
        const render = async () => {
            //이전 채팅 내역 불러오기
            await axios
                .get(`http://localhost:8085/chat/message/${chatRoomSeq}`)
                .then((res) => {
                    console.log("채팅 내역 불러오기", res.data);
                    res.data.forEach((element) => {
                        const chatting = {
                            chatRoomSeq: element.chat_room_seq,
                            chattingContents: element.chatting_contents,
                            chattingCreateDt: element.chatting_create_dt,
                            chattingSender: element.chatting_sender,
                            chattingSenderType: element.chatting_sender_type,
                            chattingSeq: element.chatting_seq,
                        };
                        setChatList((chats) => [...chats, chatting]);
                    });
                })
                .catch((err) => {
                    console.log("채팅 내역 불러오기 error", err);
                });
            //최초 렌더링시 웹소켓 연결
            await connect();
        };

        render();

        // return () => disConnect();
    }, []);

    //스크롤 적용
    useEffect(() => {
        // 채팅 메시지가 출력되는 컨테이너 가져오기
        const chatContainer = document.getElementById("chatting-contents-container");

        // 스크롤 위치를 가장 아래쪽으로 설정
        // 'scrollTop' 속성은 요소의 상단 가장자리와 그 요소의 콘텐츠 뷰포트의 상단 가장자리 사이의 거리
        // 'scrollHeight' 속성은 padding을 포함하지만 margin과 border를 포함하지 않는 이 요소의 전체 내용 높이
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatList]); //메시지가 추가될 때마가 높이 조정

    //웹소켓 연결
    const connect = () => {
        //이미 웹소켓이 활성화 된 경우 return
        if (stompClient && stompClient.connected) {
            return;
        }

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
                // reconnectDelay: 5000, //자동재연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            // //해당 채팅방 구독
            newClient.onConnect = () => {
                newClient.subscribe(`/sub/chat/${chatRoomSeq}`, callback);

                newClient.publish({
                    destination: "/pub/enter/" + chatRoomSeq,
                    body: JSON.stringify({
                        type: "ENTER",
                        chattingContents: token.userNick + "님이 입장하셨습니다",
                    }),
                });
            };

            newClient.activate(); //클라이언트 활성화
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
            await setContent(chatting);
            await setChatList((chats) => [...chats, chatting]);
        }
    };

    //연결해제
    const disConnect = async () => {
        if (!stompClient.connected == null || !stompClient) {
            // stompClient 체크 추가
            return;
        }

        //퇴장 메시지
        await stompClient.publish({
            destination: "/pub/exit/" + chatRoomSeq,
            body: JSON.stringify({
                type: "EXIT",
                chattingContents: token.userNick + "님이 퇴장하셨습니다",
            }),
        });

        await stompClient.deactivate();

        if (token.type === "M") {
            await navigate("/todowedding/map");
        } else {
            await navigate("/todowedding/partner");
        }
    };

    //전송하기
    const send = () => {
        if (content === "" || !stompClient) {
            return;
        }

        console.log("propertied : ", chatRoomSeq, token.userSeq, content, token.type, token.userNick);

        let sendTime = new Date();
        let month = ("0" + (sendTime.getMonth() + 1)).slice(-2);
        let day = ("0" + sendTime.getDate()).slice(-2);
        let hours = ("0" + sendTime.getHours()).slice(-2);
        let minutes = ("0" + sendTime.getMinutes()).slice(-2);
        let dateString = month + "/" + day + " " + hours + ":" + minutes;

        stompClient.publish({
            destination: "/pub/chat/" + chatRoomSeq,
            body: JSON.stringify({
                type: "TALK",
                chattingCreateDt: dateString,
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
        console.log("chatList : ", chatList);
        return chatList.map((item, idx) => {
            if (item.type === "ENTER") {
                console.log("ENTER : ", item.chattingContents);
                return (
                    <div
                        key={idx}
                        className="py-2 px-3 bg-gray-200 my-3 text-center shadow-md rounded-full max-w-[220px] self-center text-xs"
                    >
                        <span className="px-2">{item.chattingContents}</span>
                    </div>
                );
            } else if (item.type === "EXIT") {
                return (
                    <div
                        key={idx}
                        className="py-2 px-3 bg-gray-200 my-3 text-center shadow-md rounded-full max-w-[220px] self-center text-xs"
                    >
                        <span className="px-2">{item.chattingContents}</span>
                    </div>
                );
            } else {
                if (item.chattingSenderType != token.type) {
                    return (
                        <div key={idx} className="snap-center mr-3 my-2 text-xs w-[400px] ml-3">
                            <div className="my-1 text-left px-2 py-1 rounded-full bg-[#FFD7A9] border-none w-fit">
                                <span>{item.chattingSender}</span>
                            </div>
                            <div className="flex flex-row">
                                <div className="py-2 mr-1 text-left shadow-md border rounded-md border-pink-300 shadow-white-300 box-content">
                                    <span className="px-2">{item.chattingContents}</span>
                                </div>
                                <div className="mt-1 text-left text-[8px]">
                                    <span>{item.chattingCreateDt}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={idx} className="flex flex-row snap-center self-end my-2 text-xs mr-3">
                            <div className="mr-1 text-right text-[8px] align-self-end">
                                <span>{item.chattingCreateDt}</span>
                            </div>
                            <div className="py-2 shadow-md shadow-gray-300 border rounded-md border-black text-right box-content">
                                <span className="px-2">{item.chattingContents}</span>
                            </div>
                        </div>
                    );
                }
            }
        });
    };

    return (
        <div
            id="chatting-container"
            className="h-[80%] w-[90%] mx-auto mt-[110px] flex flex-col border rounded-2xl border-black"
        >
            <div
                id="chatting-banner"
                className="flex flex-row bg-[#D0CFFA] text-lg font-bold h-10 border rounded-t-2xl"
            >
                <p className="text-left ml-4 mt-[6px] text-[14px]">1:1 상담하기</p>
                <button
                    className="font-light text-xs ml-auto mr-1 border border-black self-center px-2 py-1 rounded-md text-gray-600"
                    onClick={() => {
                        disConnect();
                    }}
                >
                    채팅종료
                </button>
            </div>
            <div
                id="chatting-contents-container"
                className="scrollbar-hide snap-y flex flex-col h-[520px] overflow-y-auto"
            >
                {token && msgBox()}
            </div>
            <div id="chatting-input-container" className="grid grid-cols-6 bg-[#F4F4F4] h-[100px] rounded-b-2xl mt-1">
                <div className="col-span-5 flex flex-col-reverse border-b border-black mx-3 mb-10 align-bottom">
                    <input
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        id="chatting-input-box"
                        type="text"
                        className="appearance-none bg-transparent border-noneh-9 w-80 ml-2 mb-1 focus:outline-none  text-gray-700 border-[#9F7FFC]-500"
                    ></input>
                </div>
                <button
                    onClick={() => {
                        send();
                    }}
                    className="bg-[#C8C8C8] mt-5 mb-10 align-bottom rounded-md h-9 mr-3"
                >
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChattingRoom;
