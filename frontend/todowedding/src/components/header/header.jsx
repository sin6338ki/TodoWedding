import React from 'react'
import { Link } from 'react-router-dom';
import { NavbarBrand } from 'reactstrap';

const header = () => {
  return (
    <div className=''>
        <img src="/images/todo_logo.png" alt="ToDo" width="130px" 
        onClick={()=>{window.location.href="/"}}/>
        <Link to="todowedding/login">
          <span>로그인</span>
        </Link> 
    </div>
  )
}

export default header