import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';

/*
 * DayCheckSeq에 저장된 D-Day 체크리스트 Contents
 * 작성자 : 서현록
 * 작성일 : 2023.09.13
 */

const DayCheckSeq = ({ checkdaySeq, shareToKatalk }) => {
    let {checkdaySeqParams} = useParams();
    let location = useLocation();

    const [contentsLocal, setContentsLocal] = useState([]);
    const [checkDayContents, setCheckDayContents] = useState("");


    //메인에서는 checkdaySeqParams로 받아오기
    useEffect(() => {
        getDayCheckContents(checkdaySeq || checkdaySeqParams);
        if(location.state && location.pathname !== "/daychecklist"){
            console.log('D-Day 넘겨받기 : ', location.state.checkday_contents);
            setCheckDayContents(location.state.checkday_contents);
        }
    }, [checkdaySeq]);

    const getDayCheckContents = async (checkdaySeq) => {
        try {
            console.log('checkdaySeq: ', checkdaySeq)
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
                {contentsLocal && contentsLocal.map((contentItem, index) => (
                    <p key={index}>{contentItem}</p>
                ))}
            </div>
            {location.pathname !== "/daychecklist" && (
                <div>
                    <button className="daychecklist-btn"
                       onClick={() => {
                        if (typeof shareToKatalk === 'function') {
                            shareToKatalk();
                        } else {
                            console.error('shareToKatalk is not a function');
                        }
                    }}>
                            <p>카카오톡 공유하기</p>
                    </button>
                </div>
            
            )}
           
       </div>
    );
};

export default DayCheckSeq;
