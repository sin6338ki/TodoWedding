import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Callback = () => {
    // useSearchParams() : URL의 쿼리파라미터에 대한 접근과 조작을 할 수 있음
    const [searchParams] = useSearchParams();
    // Callback 화면 URL에서 code값 가져오기
    const code = searchParams.get("code");
    console.log("code :", code);

    // const [error, setError] = useState(null)  //상태를 추가하여 에러를 저장한다고함

    // useNavigate() : 페이지 이동
    //  const navigator = useNavigate();

    //    // Spring으로 code값 넘겨주기 (coco코드)
    //   const fetchData = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:8085/kakaologin?code=${code}`);
    //         console.log(res.data);
    //         console.log(res.data.CUST_ID);
    //         console.log(res.data.CUST_IMG);

    //         //쿠키 저장
    //         cookies.save('CUST_ID', res.data.CUST_ID);
    //         cookies.save('CUST_IMG', res.data.CUST_IMG);

    //         if (res.data.CUST_IMG == "0") { //회원가입
    //             navigator('/join');
    //         } else { //로그인
    //             navigator('/');
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    //   //useEffect( ()=>{}) : 화면이 렌더링이 될 때마다 매번 실행
    //   //useEffect( ()=>{},[]) : []안에 들어간 값이 변경될 때마다 실행
    //   useEffect(() => {
    //     fetchData();
    // }, [code, navigator]);

    //   useEffect(() => {
    //     console.log('code :', code);

    //     axios.get(`http://localhost:8085/auth/kakao/callback?code=${code}`)
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setError(error); // 에러발생한 경우 상태에 저장
    //     })
    //   }, [code])

    //   return (
    //     <div>
    //     {error ? (
    //       <div>
    //         {/* 네트워크 오류인 경우 */}
    //         {error.message === 'Network Error' ? (
    //           <p> 네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인하세요.</p>
    //         ) : (
    //           // 404 오류 또는 다른 서버 오류인 경우
    //           <p>서버에서 요청한 페이지를 찾을 수 없습니다.</p>
    //         )}
    //       </div>
    //     ) : (
    //       // 에러가 없는 경우
    //       <div>Callback</div>
    //     )}
    //   </div>
    // );
    // };

    useEffect(() => {
        console.log("code :", code);

        axios
            .get(`http://localhost:8085/auth/kakao/callback?code=${code}`)
            .then((res) => {
                console.log("callback rsponse : ", res.data);
                setKakaoLogin(res.data);
            })
            .catch((error) => {
                console.log("callback error", error);
            });
    }, [code]);

    return <div>Callback</div>;
};

export default Callback;
