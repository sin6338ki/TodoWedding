import React from 'react'
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <img src="/images/todo_main.png" alt="main" width="300px"/>
      <div>
        <Link to="todowedding/calendar">
          <span>일정관리</span>
        </Link>
        <Link to="todowedding/todolist">
          <span>투두리스트</span>
        </Link>
        <Link to="todowedding/budget">
          <span>예산관리</span>
        </Link>
        <Link to="todowedding/map">
          <span>업체찾기</span>
        </Link>
      </div>
    </div>
  )
}

export default Main