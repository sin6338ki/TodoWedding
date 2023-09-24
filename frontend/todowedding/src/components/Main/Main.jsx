import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    //웨딩 항목별 체크리스트 ----------------------------------------------------------------
    useEffect(() => {
        fetchCheckItems();
    }, []);

    // 항목별 체크리스트 전체 조회
    const fetchCheckItems = async () => {
        try {
            const response = await axios.get("http://3.36.116.165:8085/checkitem");
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
            const response = await axios.get("http://3.36.116.165:8085/daychecklist");
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
        <div>
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
                    웨딩 D-Day
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
