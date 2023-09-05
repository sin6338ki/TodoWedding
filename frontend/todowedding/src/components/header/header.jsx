import React from 'react'
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <div>
      <img src="/images/todo_logo.png" alt="logo" width="70px"/>
      <Link to="todowedding/login">
          <span>로그인</span>
      </Link>
    </div>
  )
}

export default header