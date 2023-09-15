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

    useEffect(() => {
        getDayChecklist();

        //카카오톡 sdk 추가
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

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

    //카카오톡 공유하기
    const shareToKatalk = () => {
        // //카카오 sdk script 부른 후 window.Kako로 접근
        // if (window.Kakao) {
        //     const kakao = window.Kakao;
        //     //중복 initialization 방지
        //     //카카오에서 제공하는 javascript key를 이용하여 initialize
        //     if (!kakao.isInitailized()) {
        //         kakao.init("016e5a925c17a41e9f83e8760a16fa80");
        //     }
        //     kakao.Link.sendDefault({
        //         objectType: "text",
        //         text: "기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
        //         link: {
        //             mobileWebUrl: "https://developers.kakao.com",
        //             webUrl: "https://developers.kakao.com",
        //         },
        //     });
        // }
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
                        <DayCheckSeq checkdaySeq={selectedOption.value} />
                    </div>
                    <div>
                        <button
                            className="daychecklist-btn"
                            onClick={() => {
                                shareToKatalk();
                            }}
                        >
                            <p>내 카카오톡으로 보내기</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DayCheckList;
