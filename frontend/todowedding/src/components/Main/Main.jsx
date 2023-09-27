import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteToken } from "../../redux/reducers/AuthReducer";
import { useSelector, useDispatch } from "react-redux";

//React-Slick 라이브러리
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "./SlickSlider";

/*
 * 메인페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 * 수정일 :
 *  - Slick-Slider로 웨딩 가이드 연결 (서현록, 2023.09.14)
 *  - 로그인 전/후 처리 로직 추가 (서현록, 2023.09.14)
 */

const Main = () => {
    const nav = useNavigate();

    const [checkItems, setCheckItems] = useState([]);
    const [checklist, setChecklist] = useState([]);

    //추가 : 2023.09.25 토큰 유무 확인 유광작성 카카오 토큰 사용자 유효성 확인
    const token = useSelector((state) => state.Auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Token:", token); // 토큰 값 확인

        if (token) {
            // 토큰 유효성 확인경로
            axios
                .get("https://kapi.kakao.com/v1/user/access_token_info", {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                })
                .then((response) => {
                    console.log("Response:", response);
                    console.log("토큰이 유효합니다");
                })
                .catch((error) => {
                    console.log("토큰 검증 중 오류 발생:", error);
                    if (error.response) {
                        alert("세션이 만료되었습니다. 다시 로그인해주세요.");

                        // 세션 값 삭제 및 로그아웃 처리
                        dispatch(deleteToken());

                        // 메인 페이지로 이동
                        nav("/");
                    }
                });
        } else {
            // 세션 값 삭제 및 로그아웃 처리
            dispatch(deleteToken());

            // 메인 페이지로 이동
            nav("/");
        }
    }, [nav, dispatch, token]);

    //웨딩 항목별 체크리스트 ----------------------------------------------------------------
    useEffect(() => {
        fetchCheckItems();
    }, []);

    // 항목별 체크리스트 전체 조회
    const fetchCheckItems = async () => {
        try {
            const response = await axios.get("http://localhost:8085/checkitem");
            setCheckItems(response.data);
            console.log("항목별 체크리스트 : ", response.data);
        } catch (error) {
            console.error("checkitem 전체 불러오기 error : ", error);
        }
    };

    //항목 클릭하면 해당 체크리스트로 이동
    const handleClick = (item) => {
        nav(`/checkitem/${item.check_item_seq}`, { state: item });
        console.log("항목 클릭하면 해당 체크리스트로 이동 : ", item.check_item_seq);
    };
    //--------------------------------------------------------------------------------------

    //웨딩 D-Day 체크리스트------------------------------------------------------------------
    useEffect(() => {
        const fetch = async () => {
            await getDayChecklist();
        };

        fetch();
    }, []);

    //D-Day 체크리스트 전체 조회
    const getDayChecklist = async () => {
        try {
            const response = await axios.get("http://localhost:8085/daychecklist");
            setChecklist(response.data);
            console.log("D-Day 체크리스트 : ", response.data);
        } catch (error) {
            console.error("D-Day 리스트 error : ", error);
        }
    };

    //항목 클릭하면 해당 체크리스트로 이동
    const handleDdayClick = (item) => {
        nav(`/daychecklist/${item.checkday_seq}`, { state: item });
        console.log("항목 클릭하면 해당 체크리스트로 이동 : ", item.checkday_seq);
        console.log("항목 클릭하면 해당 체크리스트로 이동 : ", item.checkday_contents);
    };
    //--------------------------------------------------------------------------------------

    return (
        <div style={{height:"700px"}}>
            <div>
                <SlickSlider />
            </div>
            <div style={{ display: "flex" }}>
                <p className="main-itemchecklist">
                    웨딩 항목별
                    <br />
                    체크리스트
                </p>
                <div className="main-itemchecklist-container">
                    {checkItems.map((item, index) => (
                        <button
                            className="main-itemchecklist-item"
                            id="main-itemchecklist-item1"
                            key={index}
                            onClick={() => handleClick(item)}
                        >
                            <p>{item.check_item_contents}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <p className="main-ddaychecklist">
                    D-Day
                    <br />
                    체크리스트
                </p>
                <div className="main-ddaychecklist-container">
                    {checklist.map((item, index) => (
                        <button className="main-itemchecklist-item" key={index} onClick={() => handleDdayClick(item)}>
                            <p>{item.checkday_contents}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
