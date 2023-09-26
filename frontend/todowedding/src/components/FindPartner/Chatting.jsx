import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

/**
 * 채팅방 생성 및 기존 채팅방 확인 (채팅방 들어가기 전 거쳐가는 페이지)
 * 작성자 : 신지영
 * 작성일 : 2023.09.05
 */
const Chatting = () => {
    const navigate = useNavigate();
    const { partnerSeq } = useParams();
    const token = useSelector((state) => state.Auth.token);
    const [data, setData] = useState();
    const [chatRoomSeq, setChatRoomSeq] = useState();

    useEffect(() => {
        //request 데이터 - 업체 고유번호, 멤버 고유번호
        setData({
            memberSeq: token.userSeq,
            chatRoomCreateDt: new Date(),
            partnerSeq: parseInt(partnerSeq),
        });
    }, [token]);

    //data 정보가 변경되면 채팅방 입장
    useEffect(() => {
        console.log("data, ", data);
        enterChat();
    }, [data]);

    //상담 시작 클릭시 발생하는 이벤트
    const enterChat = async () => {
        //기존 연결되어 있는 채팅방 유무 확인
        await isAlivedChat();
    };

    useEffect(() => {
        console.log("chatRoomSeq 변화 확인 : ", chatRoomSeq);
    }, [chatRoomSeq]);

    //채팅방 만드는 이벤트
    const createChat = () => {
        console.log("createChat 실행!");
        axios
            .post("http://localhost:8085/chat", data)
            .then((res) => {
                let result = res.data;
                result === 1 && isAlivedChat();
            })
            .catch((err) => {
                console.log("createChat axios error : ", err);
            });
    };

    //채팅방 유무 확인 이벤트
    const isAlivedChat = async () => {
        try {
            const res = await axios.get(`http://localhost:8085/chat/${token.userSeq}/${partnerSeq}`);
            console.log("isAlivedChat result : ", res.data);
            let result = res.data;
            if (result != "none") {
                setChatRoomSeq(res.data);
                moveToChat(res.data); // 직접 chat room seq 값을 넘겨주는 것을 추가하였습니다.
            } else {
                createChat();
            }
        } catch (err) {
            console.log("isAlivedChat error : ", err);
        }
    };

    //채팅방으로 이동하는 이벤트
    const moveToChat = (chatRoomSeq) => {
        //response 되면 실제 채팅 상담 페이지로 이동
        //페이지 이동시 data 함께 보낼 예정
        navigate(`/todowedding/chat-room/${chatRoomSeq}`, {
            state: { partnerSeq: partnerSeq, memberSeq: token.userSeq },
        });
    };

    return <div>채팅방 연결중입니다...</div>;
};

export default Chatting;
