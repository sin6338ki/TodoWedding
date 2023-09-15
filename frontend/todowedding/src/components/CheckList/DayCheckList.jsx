import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DayCheckSeq from "./DayCheckSeq";
import { useSelector } from "react-redux";

/*
 * D-Day 체크리스트
 * 작성자 : 서현록
 * 작성일 : 2023.09.13
 * 수정
 *  - 카카오톡 공유하기 api 연동 기능 추가 (신지영, 2023.09.14)
 */

const DayCheckList = () => {
    const [checklist, setChecklist] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [contents, setContents] = useState([]);

    //카카오톡 공유하기 관련
    const script = document.createElement("script");
    const [message, setMessage] = useState("");
    const [kakaoMessage, setKakaoMessage] = useState();

    useEffect(() => {
        const fetch = async () => {
            await getDayChecklist();
            await addKakaoSDK();
        };

        fetch();
    }, []);

    const addKakaoSDK = () => {
        //카카오톡 sdk 추가
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    };

    const getDayChecklist = async () => {
        try {
            const response = await axios.get("http://localhost:8085/daychecklist");
            setChecklist(response.data);
            console.log("D-Day 리스트 : ", response.data);

            let combinedContents = [];
            response.data.forEach((item) => {
                if (Array.isArray(item.checkday_contents)) {
                    combinedContents.push(...item.checkday_contents);
                } else if (item.checkday_contents) {
                    combinedContents.push(item.checkday_contents);
                }
            });

            let selectOptions = response.data.map((item) => ({
                label: item.checkday_contents,
                value: item.checkday_seq,
            }));

            setOptions(selectOptions);
        } catch (error) {
            console.error("D-Day 리스트 error : ", error);
        }
    };

    // react-select 컴포넌트 선택 전 / 후 스타일 적용------------------------------------------
    const styles = {
        control: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
        }),
        placeholder: (provided) => ({
            ...provided,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = "opacity 300ms";

            return {
                ...provided,
                opacity,
                transition,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
            };
        },
    };
    //end -----------------------------------------------------------------------------------

    useEffect(() => {
        if (contents.length > 0 && selectedOption) {
            console.log("selectOptions : ", selectedOption.label);
            //메시지 가공
            console.log("message 원본 : ", contents);
            let newMessage = "💑TodoWedding만의 서비스! \n";
            newMessage += "💌 결혼 예정일 " + selectedOption.label + " 체크리스트 💌\n\n";
            contents.forEach((element, idx) => (newMessage += idx + 1 + ". " + element + "\n"));

            setMessage(newMessage);
        }
    }, [selectedOption, contents]);

    useEffect(() => {
        console.log("message : ", message);
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

    return (
        <div>
            <div className="checkitem-intro">
                D-Day 웨딩 체크리스트를 조회하고
                <br />
                원하는 체크리스트를 카카오톡으로 받아보세요!
            </div>
            <div className="daychecklist-selectbox">
                <Select
                    options={options}
                    onChange={setSelectedOption}
                    isSearchable
                    styles={styles}
                    placeholder="D-Day를 선택해주세요"
                />
            </div>
            {selectedOption && (
                <>
                    <div className="daychecklist-header">
                        <p>결혼예정일 {selectedOption.label} 체크리스트</p>
                    </div>
                    <div className="daychecklist-contents">
                        <DayCheckSeq checkdaySeq={selectedOption.value} setContents={setContents} contents={contents} />
                    </div>
                    <div>
                        <button
                            className="daychecklist-btn"
                            onClick={() => {
                                shareToKatalk();
                            }}
                        >
                            <p>카카오톡 공유하기</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DayCheckList;
