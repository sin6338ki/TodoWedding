// Modal.js
import React from "react";
import { Link } from 'react-router-dom';
import TodoLogo from '../assets/images/todo_logo.png'

/*
 * BottomBar +버튼 눌렀을 때 Modal창
 * 작성자 : 서현록
 * 작성일 : 2023.09.06
 */

function Modal(props) {
 
function closeModal() {
    props.closeModal();
  }
 
  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        <img src={TodoLogo} width={'200px'}/>
        <div className='add-link' onClick={closeModal}>
            <Link to="todowedding/calendar" className="add-content">임시 리스트 입니다</Link>
            <Link to="todowedding/schedule" className="add-content">일정추가</Link>
            <Link to="todowedding/budget" className="add-content">항목별 체크리스트</Link>
            <Link to="todowedding/calendar" className="add-content">D-Day 체크리스트</Link>       
        </div>
        {props.any}
      </div>
    </div>
  );
}
 
export default Modal;
