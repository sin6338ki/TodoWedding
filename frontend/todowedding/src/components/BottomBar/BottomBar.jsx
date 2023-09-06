import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import WeddingReport from '../../assets/images/icon/footer_weddingreport.png';
import Calendar from '../../assets/images/icon/calendar.png';
import Budget from '../../assets/images/icon/budget.png';
import Home from '../../assets/images/icon/home.png';
import AddButton from '../../assets/images/icon/footer_plus.png';

function BottomBar(){

  return (
    <div className="bottom-bar">
      <Link to="todowedding/weddingreport" className='footer-menu-left'>
      <img src={WeddingReport} alt="WeddingReport" width="30px"/>
        <span class='text-xs'>웨딩리포트</span>
      </Link>
      <Link to="todowedding/calendar" className='footer-menu-right'>
      <img src={Calendar} alt="Calendar" width="30px"/>
        <span class='text-xs'> 일정관리</span>
      </Link>

      {/* AddButton */}
      <img className='footer-add' src={AddButton} alt="AddButton" width="55px"/>

      <Link to="todowedding/budget" className='footer-menu-left'>
      <img src={Budget} alt="Budget" width="32px"/>
        <span class='text-xs'> 예산관리</span>
      </Link>
      <Link to="/" className='footer-menu-right'>
      <img src={Home} alt="Home" width="30px"/>
        <span class='text-xs'> Home</span>
      </Link>
    </div>
  )
}


export default BottomBar