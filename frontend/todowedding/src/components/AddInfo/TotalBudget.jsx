import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * 총 예산 조회, 등록, 수정 기능
 * 작성자 : 서현록
 * 작성일 : 2023.09.19
 */

const TotalBudget = () => {
    const nav = useNavigate();

    //userSeq 받아오기
    const token = useSelector((state) => state.Auth.token);
    const userSeq = token ? token.userSeq : 0;

    const [totalBudget, setTotalBudget] = useState("");

    //초기 상태에 등록된 총예산이 있는지 나타내는 상태 변수 추가 (hasTotalBudget)
    const [hasTotalBudget, setHasTotalBudget] = useState(false);

    //등록된 총 예산이 있는지 확인
    useEffect(() => {
        const fetchTotalBudget = async () => {
            try {
                //백엔드로 총 예산 조회 요청 보내기
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/totalbudget/select/${userSeq}`);
                if (response.data) {
                    setTotalBudget(response.data.total_budget);
                    setHasTotalBudget(true);
                }
            } catch (error) {
                console.error("총 예산 조회 에러 : ", error);
            }
        };
        fetchTotalBudget();
    }, [userSeq]);

    // 등록/수정 버튼 클릭시
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response;
            if (hasTotalBudget) {
                //이미 등록된 총 예산이 있는 경우 수정 API 호출하기
                response = await axios.post(`${process.env.REACT_APP_API_URL}/totalbudget/update`, {
                    total_budget: totalBudget,
                    member_seq: userSeq,
                });
            } else {
                //등록된 총 예산이 없는 경우 등록 API 호출하기
                response = await axios.post(`${process.env.REACT_APP_API_URL}/totalbudget/insert`, {
                    total_budget: totalBudget,
                    member_seq: userSeq,
                });
            }

            if (response.status === 200) {
                alert("총 예산 비용이 성공적으로 업데이트되었습니다.");
                nav("/todowedding/calendar");
            } else {
                alert("총 예산 비용 업데이트에 실패하였습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-container">
            <form onSubmit={handleSubmit}>
                <div className="marrydate-header pt-3">총 예산을 입력해주세요</div>
                <div className="marrydate-contents">
                    <input
                        type="number"
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(e.target.value)}
                        placeholder="총 예산을 입력해 주세요"
                        className="text-center border border-gray-300 rounded-md p-2"
                        style={{ width: "70%" }}
                    />{" "}
                    원
                </div>
                <div className="pl-5">
                    <button className="marrydate-btn" type="submit">
                        {hasTotalBudget ? "수정" : "등록"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TotalBudget;
