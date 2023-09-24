import axios from "axios";
import { store } from "./store"; // Redux 스토어
import { setToken } from "./actions"; // 액세스 토큰을 업데이트하는 action creator 함수

/*
 * Refresh토큰을 사용해 Access토큰 재발급
 * 작성자 : 서유광
 * 작성일 : 2023.09.22
 */

const instance = axios.create({
    baseURL: "http://3.36.116.165:8085",
});

// 응답 인터셉터 추가
instance.interceptors.response.use(
    function (response) {
        // 성공한 응답은 그대로 반환
        return response;
    },
    async function (error) {
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
            // 상태 코드가 401이고, 이전에 재시도한 요청이 아니라면

            const refreshToken = store.getState().auth.refreshToken; // 리프레시 토큰 가져오기

            try {
                const res = await instance.post("/member/refresh", { refreshToken });
                const newAccessToken = res.data.accessToken; // 새로운 액세스 토큰 가져오기

                // Redux 스토어의 액세스 토큰 업데이트하기
                store.dispatch(setToken(newAccessToken));

                // 원래 요청의 Authorization header를 새로운 액세스 토큰으로 설정하고 재요청하기
                error.config.headers["Authorization"] = "Bearer " + newAccessToken;
                error.config.__isRetryRequest = true;
                return instance(error.config);
            } catch (err) {
                console.log("액세스 토큰 갱신 실패", err);
            }
        }

        return Promise.reject(error); // 그 외 에러 반환
    }
);

export default instance;
