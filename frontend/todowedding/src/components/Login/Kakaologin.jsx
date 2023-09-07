import React from 'react'
import { Link } from 'react-router-dom';
import kakao from '../../assets/snslogin/kakao.png'




const Kakaologin = () => {

    //const clientId = process.env.REACT_APP_CLIENT_ID
    //const redirectUri = process.env.REACT_APP_REDIRECT_URI

    // 카카오 로그인 정보
    // const clientId = '05e6f6ac6b8cd6cf3b1ec2a9ca6542de'
    // const redirectUri = 'http://localhost:3000/auth/kakao/callback'             
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=05e6f6ac6b8cd6cf3b1ec2a9ca6542de&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`


  return (
  
    <div>
        <a className='kakao' href={URL}>
            <em></em>
            <img src={kakao} width={200} alt="Kakao Login" onClick={()=>{console.log("kakaologin 클릭!")}}></img>
        </a>
        <br/>
        <Link to="todowedding/login/test">
            <span>다른 카카오로 계정시작하기</span>
        </Link>
        <br/>
        <Link to="todowedding/login/test2222">
            <span>기업계정으로 시작하기</span>
        </Link>
        <br/>
    </div>
  )
}

export default Kakaologin