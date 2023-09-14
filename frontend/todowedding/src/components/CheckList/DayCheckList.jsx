import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DayCheckSeq from "./DayCheckSeq";

/*
 * D-Day 체크리스트
 * 작성자 : 서현록
 * 작성일 : 2023.09.13
 */

const DayCheckList = () => {
    const [checklist, setChecklist] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        getDayChecklist();
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

    // react-select 컴포넌트 선택 전 / 후 스타일 적용
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
                        <button className="daychecklist-btn">
                            <p>내 카카오톡으로 보내기</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DayCheckList;
