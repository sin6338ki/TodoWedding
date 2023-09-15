import React from 'react'
import MyCalendar from '../Calendar/MyCalendar'
import TodoReport from './TodoReport'
import BudgetReport from './BudgetReport'

const WeddingReport = () => {
  return (
    <div>
      <MyCalendar/>
      <div style={{ display: "flex"}}>
        <div className='todo-report-container'>
          <p>결혼 준비 진행도</p>
          <TodoReport/>
        </div>
        <div className='budget-report-contanier'>
          <p>예산 관리 그래프</p>
          <BudgetReport/>
        </div>
      </div>
    </div>
  )
}

export default WeddingReport