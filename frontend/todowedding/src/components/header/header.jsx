import React from 'react'
import { Link } from 'react-router-dom';
import TodoLogo from '../../assets/images/todo_logo.png';

const header = () => {
  return (
    <div>
        <img src={TodoLogo} alt="ToDo" width="130px" 
        onClick={()=>{window.location.href="/"}}/>
        <Link to="/todowedding/login" >
          <span>로그인</span>
        </Link> 
    </div>
  )
}

export default header