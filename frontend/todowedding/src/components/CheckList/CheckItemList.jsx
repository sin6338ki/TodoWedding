import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*
 * 항목별 체크리스트 전체 조회, 해당 체크리스트로 이동
 * 작성자 : 서현록
 * 작성일 : 2023.09.12
 */

const CheckItemList = () => {
    const [checkItems, setCheckItems] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetchCheckItems();
    }, []);

    // 항목별 체크리스트 전체 조회
    const fetchCheckItems = async () => {
        try {
            const response = await axios.get("http://172.30.1.7:8085/checkitem");
            setCheckItems(response.data);
            console.log("response.data : ", response.data);
        } catch (error) {
            console.error("checkitem 전체 불러오기 error : ", error);
        }
    };

    //항목 클릭하면 해당 체크리스트로 이동
    const handleClick = (item) => {
        nav(`/checkitem/${item.check_item_seq}`, { state: item });
        console.log("항목 클릭하면 해당 체크리스트로 이동 : ", item.check_item_seq);
    };

    return (
        <div>
            <div className="checkitem-intro">
                항목별 추천하는 웨딩 체크리스트를 조회하고
                <br />
                나만의 웨딩 투두리스트에 일정을 추가하세요!
            </div>
            <div>
                {checkItems.map((item, index) => (
                    <button className="checkitem-item" key={index} onClick={() => handleClick(item)}>
                        <p>{item.check_item_contents}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CheckItemList;
