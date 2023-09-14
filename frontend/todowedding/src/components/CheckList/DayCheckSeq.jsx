import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
 * DayCheckSeq에 저장된 D-Day 체크리스트 Contents
 * 작성자 : 서현록
 * 작성일 : 2023.09.13
 */

const DayCheckSeq = ({ checkdaySeq }) => { 
    const [contents, setContents] = useState([]);

  useEffect(() => {
    getDayCheckContents(checkdaySeq);
  }, [checkdaySeq]);

  const getDayCheckContents = async (seq) => {
    try {
      const response = await axios.get(`http://localhost:8085/daychecklist/${checkdaySeq}`);
      
      setContents(response.data.map(item => item.checkday_list_contents));
      
    } catch (error) {
      console.error('CheckList_Content 에러 : ', error);
    }
  };

 return (
   <div>
     {contents.map((contentItem, index) => (
       <p key={index}>{contentItem}</p> 
     ))}
   </div>
 );
};

export default DayCheckSeq;
