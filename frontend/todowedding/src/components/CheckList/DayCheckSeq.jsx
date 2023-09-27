import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

/*
 * DayCheckSeq에 저장된 D-Day 체크리스트 Contents
 * 작성자 : 서현록
 * 작성일 : 2023.09.13
 * 수정
 *  - 카카오톡 공유하기 기능 추가 (신지영, 2023.09.16)
 */

const DayCheckSeq = ({ checkdaySeq, setContents, contents }) => {
    let { checkdaySeqParams } = useParams();

    let location = useLocation();
    const script = document.createElement("script");

    const [contentsLocal, setContentsLocal] = useState([]);
    const [checkDayContents, setCheckDayContents] = useState("");

    //카카오톡 공유하기
    const [message, setMessage] = useState("");
    const [kakaoMessage, setKakaoMessage] = useState();

    const addKakaoSDK = () => {
        //카카오톡 sdk 추가
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    };

    useEffect(() => {
        if (contentsLocal.length > 0 && checkDayContents) {
            let newMessage = "💑TodoWedding만의 서비스! \n";
            newMessage += "💌 결혼 예정일 " + checkDayContents + " 체크리스트 💌\n\n";
            contentsLocal.forEach((element, idx) => (newMessage += idx + 1 + ". " + element + "\n"));

            setMessage(newMessage);
        }
        contents && setContents(contentsLocal);
    }, [checkDayContents, contentsLocal]);

    useEffect(() => {
        setKakaoMessage(message);
    }, [message]);

    //카카오톡 공유하기
    const shareToKatalk = () => {
        //카카오 sdk script 부른 후 window.Kako로 접근
        if (window.Kakao) {
            const kakao = window.Kakao;
            //중복 initialization 방지
            //카카오에서 제공하는 javascript key를 이용하여 initialize
            if (!kakao.isInitialized()) {
                kakao.init("016e5a925c17a41e9f83e8760a16fa80");
            }
            kakao.Link.sendDefault({
                objectType: "text",
                text: kakaoMessage,
                link: {
                    mobileWebUrl: "https://developers.kakao.com",
                    webUrl: "https://developers.kakao.com",
                },
            });
        }
    };

    // 카카오톡 공유하기 ------------------------------------

    //메인에서는 checkdaySeqParams로 받아오기
    useEffect(() => {
        getDayCheckContents(checkdaySeq || checkdaySeqParams);
        if (location.state && location.pathname !== "/daychecklist") {
            setCheckDayContents(location.state.checkday_contents);
        }
    }, [checkdaySeq]);

    const getDayCheckContents = async (checkdaySeq) => {
        try {
            const response = await axios.get(`http://localhost:8085/daychecklist/${checkdaySeq}`);

            setContentsLocal(response.data.map((item) => item.checkday_list_contents));
        } catch (error) {
            console.error("D-Day 체크리스트 내용 에러 : ", error);
        }
    };

    return (
        <div>
            {location.pathname !== "/daychecklist" && (
                <div>
                    <div className="checkitem-intro">
                        {`투두웨딩이 제안하는 ${checkDayContents} 웨딩 체크리스트를`}
                        <br />
                        카카오톡으로 받아보세요!
                    </div>
                    <div className="main-daychecklist-header">
                        <p>{`결혼 예정일 ${checkDayContents} 체크리스트`}</p>
                    </div>
                </div>
            )}

            <div className="daychecklist-contents">
                {contentsLocal && contentsLocal.map((contentItem, index) => <p key={index}>{contentItem}</p>)}
            </div>
            {location.pathname !== "/daychecklist" && (
                <div>
                    <button
                        className="daychecklist-btn"
                        onClick={() => {
                            if (typeof shareToKatalk === "function") {
                                shareToKatalk();
                            } else {
                                console.error("shareToKatalk is not a function");
                            }
                        }}
                    >
                        <p>카카오톡 공유하기</p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DayCheckSeq;
