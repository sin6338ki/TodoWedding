import React from 'react'
import MyCalendar from '../Calendar/MyCalendar'

const WeddingReport = () => {
  return (
    <div>
      <MyCalendar/>
      <div style={{ display: "flex"}}>
        <div>
          <p>결혼 준비 진행도</p>
        </div>
        <div>
          <p>예산 관리 그래프</p>
        </div>
      </div>
    </div>
  )
}

export default WeddingReport