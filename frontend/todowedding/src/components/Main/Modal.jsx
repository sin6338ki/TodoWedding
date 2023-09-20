// Modal.js
import React from "react";
import { Link } from "react-router-dom";
import TodoLogo from "../../assets/images/todo_logo.png";

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
        <div className="Modal z-50 relative" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}></button>
                <img src={TodoLogo} width={"200px"} />
                <div className="add-link" onClick={closeModal}>
                    <button id="modalCloseBtn" onClick={closeModal}>
                        ✖
                    </button>
                    {props.children}
                    <Link to="todowedding/schedule" className="add-content">
                        캘린더에 일정 추가
                    </Link>
                    <Link to="todowedding/marrydate" className="add-content">
                        결혼예정일 추가
                    </Link>
                    <Link to="todowedding/member/total" className="add-content">
                        웨딩 예산 추가
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Modal;
