import React from 'react'
import { Link } from 'react-router-dom';

import Guide from '../../src/assets/images/todo_main.png'

//메인 메뉴 아이콘
import Calendar from '../../src/assets/images/icon/calendar_bg.png'
import TodoList from '../../src/assets/images/icon/todolist_bg.png'
import Budget from '../../src/assets/images/icon/budget_bg.png'
import Map from '../../src/assets/images/icon/map_bg.png'

const Main = () => {
  return (
    <div>
      <img src={Guide} alt="Guide"/>
        <div style={{display:'flex', alignItems:'center'}}>
          <Link to="todowedding/calendar" className='menu-top'>
            <img src={Calendar} alt="Calender" width="80px"/>
            <span className="menu" class='text-sm'>일정관리</span>
          </Link>
          <Link to="todowedding/todolist" className='menu-top'>
            <img src={TodoList} alt="TodoList" width="80px"/>
            <span className="menu" class='text-sm'>TodoList</span>
          </Link>
        </div>

        <div style={{display:'flex', alignItems:'center'}}>
          <Link to="todowedding/budget" className='menu-bottom'>
            <img src={Budget} alt="Budget" width="80px"/>
            <span className="menu"  class='text-sm'>예산관리</span>
          </Link>       
          <Link to="todowedding/map" className='menu-bottom'>
            <img src={Map} alt="Map" width="80px"/>
            <span className="menu"  class='text-sm'>업체찾기</span>
          </Link>
        </div>     
    </div>
  )
}

export default Main