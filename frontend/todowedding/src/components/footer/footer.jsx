import React from 'react'
import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <div>
      <nav>
      <Link to="todowedding/weddingreport">
        <span>웨딩리포트</span>
      </Link>
      <Link to="todowedding/calendar">
        <span> 일정관리</span>
      </Link>
      <Link to="todowedding/budget">
        <span> 예산관리</span>
      </Link>
      <Link to="/">
        <span> Home</span>
      </Link>
      </nav>
    </div>
  )
}

export default footer