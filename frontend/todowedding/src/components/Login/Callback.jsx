import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

const Callback = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    console.log('code :', code);
    const [error, setError] = useState(null)  //상태를 추가하여 에러를 저장한다고함 

     
  useEffect(() => {
    console.log('code :', code);

    axios.get(`http://localhost:8085/api/v1/home/kakaoLogin?code=${code}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      setError(error); // 에러발생한 경우 상태에 저장
    })
  }, [code])

  return (
    <div>
    {error ? (
      <div>
        {/* 네트워크 오류인 경우 */}
        {error.message === 'Network Error' ? (
          <p> 네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인하세요.</p>
        ) : (
          // 404 오류 또는 다른 서버 오류인 경우
          <p>서버에서 요청한 페이지를 찾을 수 없습니다.</p>
        )}
      </div>
    ) : (
      // 에러가 없는 경우
      <div>Callback</div>
    )}
  </div>
);
};

export default Callback