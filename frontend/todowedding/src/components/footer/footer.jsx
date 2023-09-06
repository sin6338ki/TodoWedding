import React from 'react'
import { Link } from 'react-router-dom';
import WeddingReport from '../../assets/images/icon/footer_weddingreport.png';
import Calendar from '../../assets/images/icon/calendar.png';
import Budget from '../../assets/images/icon/budget.png';
import Home from '../../assets/images/icon/home.png';
import AddButton from '../../assets/images/icon/footer_plus.png';

const footer = () => {
  return (
    <div className="bottom-bar">
      <Link to="todowedding/weddingreport" className='footer-menu'>
      <img src={WeddingReport} alt="WeddingReport" width="25px" alignItems="center"/>
        <span class='text-xs'>웨딩리포트</span>
      </Link>
      <Link to="todowedding/calendar" className='footer-menu'>
      <img src={Calendar} alt="Calendar" width="30px" alignItems="center"/>
        <span class='text-xs'> 일정관리</span>
      </Link>

      {/* AddButton */}
      <img src={AddButton} alt="AddButton" width="55px"/>

      <Link to="todowedding/budget" className='footer-menu'>
      <img src={Budget} alt="Budget" width="32px" alignItems="center"/>
        <span class='text-xs'> 예산관리</span>
      </Link>
      <Link to="/" className='footer-menu'>
      <img src={Home} alt="Home" width="30px" alignItems="center"/>
        <span class='text-xs'> Home</span>
      </Link>
    </div>
  )
}

export default footer