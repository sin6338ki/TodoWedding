import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const UpdateSchedule = () => {
  const location = useLocation();
  const nav = useNavigate();

  const { scheduleSeq } = useParams();

  const [title, setTitle] = useState(location.state.title);
  const [startDate, setStartDate] = useState(location.state.start);
  const [endDate, setEndDate] = useState(location.state.end);

  const style = {
    bg: `bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB]`,
    container: `m-auto p-4`,
    containerDate: `bg-slate-100 m-auto p-5`,
    input: `p-3 w-full text-lg`,
};

  // 일정 수정 함수
  const updateSchedule = async (e) => {
    e.preventDefault();

    if (title === "" || startDate === "" || endDate === "") {
      alert("일정 제목과 날짜를 입력해주세요!");
    } else {
      try {
        await axios.put(`http://localhost:8085/schedule/${scheduleSeq}`
        , {
          scheduleStartDt: startDate,
          scheduleEndDt: endDate,
          scheduleContents: title,
        });
        
        alert('일정이 성공적으로 수정되었습니다.');
        nav('/todowedding/calendar');
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 일정 삭제 함수
  const deleteSchedule = async () => {
    try{
      await axios.delete(`http://localhost:8085/schedule/${scheduleSeq}`);
      
      alert('일정이 성공적으로 삭제되었습니다.');
      nav('/todowedding/calendar');
    } catch(err){
      console.log(err);
    }
    
};
  
  return (
    <div>
      <div className="add-container">
                <form
                    action="/schedule"
                    method="post"
                    style={{ width: "480px" }}
                    className={style.container}
                    id="schedule-add-form"
                >
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={style.input}
                        type="text"
                        style={{ textAlign: "center", border: "none", background: "transparent", outline: "none" }}
                        placeholder="일정 제목을 입력하세요"
                    />
                </form>
                <form style={{ width: "480px" }} className={style.containerDate} id="schedule-date">
                    <h5>
                        일정 시작
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="add-date"
                        />
                    </h5>
                    <h5>
                        일정 종료
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="add-date"
                        />
                    </h5>
                </form>
            </div>
            <button className="Add-Schedule-btn" onClick={updateSchedule}>
              캘린더 일정 업데이트하기
            </button>
            <button className="Add-TodoList-btn" onClick={deleteSchedule}>
              캘린더 일정 삭제하기
            </button>
    </div>
  )
}

export default UpdateSchedule