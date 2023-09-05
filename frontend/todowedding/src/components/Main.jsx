import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

import Guide from '../../src/assets/images/todo_main.png'

//메인 메뉴 아이콘
import Calendar from '../../src/assets/images/icon/calendar.png'
import TodoList from '../../src/assets/images/icon/todolist.png'
import Budget from '../../src/assets/images/icon/budget.png'
import Map from '../../src/assets/images/icon/map.png'

const Main = () => {
  return (
    <div>
      <img src={Guide} alt="Guide" width="px"/>

        <div style={{display:'flex', alignItems:'center', margin:'5%'}}>
          <Link to="todowedding/calendar">
            <img src={Calendar} alt="Calender" width="50px"/>
            <span>일정관리</span>
          </Link>
          <Link to="todowedding/todolist">
            <img src={TodoList} alt="TodoList" width="50px"/>
            <span>투두리스트</span>
          </Link>
        </div>

        <div style={{display:'flex', alignItems:'center', margin:'5%'}}>
          <Link to="todowedding/budget">
            <img src={Budget} alt="Budget" width="50px"/>
            <span>예산관리</span>
          </Link>       
          <Link to="todowedding/map">
            <img src={Map} alt="Map" width="50px"/>
            <span>업체찾기</span>
          </Link>
        </div>     
    </div>
  )
}

export default Main