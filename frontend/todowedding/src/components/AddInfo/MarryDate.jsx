import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * 결혼예정일 추가 기능
 * 작성자 : 서현록
 * 작성일 : 2023.09.18
 */

const MarryDate = () => {
    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    const [marryDate, setMarryDate] = useState("");

    //초기 상태에 등록된 결혼예정일 있는지 나타내는 상태 변수 추가 (hasMarryDate)
    const [hasMarryDate, setHasMarryDate] = useState(false);

    // 등록된 결혼예정일이 있는지 확인
    useEffect(() => {
        const fetchMarryDate = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/marrydate/${userSeq}`);
                if (response.data) {
                    setMarryDate(response.data);
                    setHasMarryDate(true); // 등록된 결혼 예정일이 있다면 hasMarryData를 true로 설정
                }
            } catch (error) {
                console.error("결혼예정일 조회 에러 : ", error);
            }
        };
        fetchMarryDate();
    }, [userSeq]);

    //'결혼예정일 추가' 버튼 클릭
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response;

            if (hasMarryDate) {
                // 등록된 결혼예정일이 있으면 업데이트 호출
                response = await axios.post(`${process.env.REACT_APP_API_URL}/marrydate/update`, {
                    marryDt: marryDate,
                    memberSeq: userSeq,
                });
            } else {
                // 등록된 결혼예정일이 없으면 등록하기 호출
                response = await axios.post(`${process.env.REACT_APP_API_URL}/marrydate`, {
                    marryDt: marryDate,
                    memberSeq: userSeq,
                });
            }

            if (response.status === 200) {
                alert("결혼 예정일이 성공적으로 업데이트되었습니다.");
                window.location.href = process.env.REACT_APP_MAIN_URL;
            } else {
                alert("결혼 예정일 업데이트에 실패하였습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-container">
            <form onSubmit={handleSubmit}>
                <div className="marrydate-header text-[#b4b4b4] pt-3">결혼 예정일을 선택해주세요</div>
                <div className="marrydate-contents">
                    <input
                        type="date"
                        value={marryDate}
                        onChange={(e) => setMarryDate(e.target.value)}
                        style={{ width: "50%" }}
                    />
                </div>
                <div className="pl-5">
                    <button className="marrydate-btn" type="submit">
                        {hasMarryDate ? "수정" : "등록"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MarryDate;
