import React from 'react'
import axios from 'axios'

const KakaologOut = () => {

   
    // const ACCESS_TOKEN = sessionStorage.getItem('kakaoAccess');
    // console.log(" 로그아웃용 카카오 토큰 "+ ACCESS_TOKEN);

    const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('kakaoAccess'));
    console.log(" 로그아웃용 카카오 토큰 ", ACCESS_TOKEN);

    // state = {
    //     isLogin: true,
    //   };

    axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
    headers: {
     "Content-Type": "application/x-www-form-urlencoded",
     'Authorization': `Bearer ${ACCESS_TOKEN}`
     }
})
.then((response) => {
    console.log(response);
    // window.location.href = '/'
})
.catch((error) => {
    console.error(error);
    // 이미 만료된 토큰일 경우
    if (error.response && error.response.data.code === -401) {
        //   window.location.href = '/'
        }
});


    return (
        <div>KakaoLogout</div>
    )
}

export default KakaologOut