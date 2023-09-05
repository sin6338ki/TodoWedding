import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";

const Main = () => {
  return (
    <div>
      <img src="/images/todo_main.png" alt="Guide" width="px"/>      
        <div style={{display:'flex', alignItems:'center', margin:'5%'}}>
        <Link to="todowedding/calendar">
          <img src="/images/icon/calendar.png" alt="Calender" width="50px"/>
          <span>일정관리</span>
        </Link>
        <Link to="todowedding/todolist">
          <img src="/images/icon/todolist.png" alt="TodoList" width="50px"/>
          <span>투두리스트</span>
        </Link>
        </div>
        <div style={{display:'flex', alignItems:'center', margin:'5%'}}>
        <Link to="todowedding/budget">
          <img src="/images/icon/budget.png" alt="Budget" width="50px"/>
          <span>예산관리</span>
        </Link>       
        <Link to="todowedding/map">
          <img src="/images/icon/map.png" alt="Map" width="50px"/>
          <span>업체찾기</span>
        </Link>
        </div>     
    </div>
  )
}

export default Main