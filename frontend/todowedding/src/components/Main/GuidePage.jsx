import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Guide Image
import Guide1 from "../../assets/images/Card-News/Guide1.png";
import Guide2 from "../../assets/images/Card-News/Guide2.png";
import Guide3 from "../../assets/images/Card-News/Guide3.png";
import Guide4 from "../../assets/images/Card-News/Guide4.png";
import Guide5 from "../../assets/images/Card-News/Guide5.png";

/*
 * 메인페이지 React-Slider 클릭시 이동하는 웨딩가이드페이지
 * 작성자 : 서현록
 * 작성일 : 2023.09.16
 */

const GuidePage = () => {
    const nav = useNavigate();

    const { id } = useParams();
    const images = [Guide1, Guide2, Guide3, Guide4, Guide5];

    const toMain = () => {
        nav("/");
    };

    return (
        <div style={{ marginTop: "81px" }}>
            <img src={images[Number(id) - 1]} alt={`Image${id}`} />
            <button onClick={toMain} className="guide-to-main">
                메인으로 돌아가기
            </button>
        </div>
    );
};

export default GuidePage;
