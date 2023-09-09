import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux Toolkit의 createSlice 함수를 사용하여
 * 액션 생성자와 리듀서를 자동으로 생성하는 Redux 슬라이스를 정의
 * 작성자 : 신지영
 * 작성일 : 2023.09.09
 */

export const TOKEN_TIME_OUT = 600 * 1000 * 1000; //1000분

export const tokenSlice = createSlice({
    /**
     * authenticated : 현재 로그인 여부 확인
     * accessToken : accessToken 저장
     * expireTime : 토큰 만료 시간
     */

    name: "authToken",
    initialState: {
        authenticated: false,
        accessToken: null,
        expireTime: null,
    },
    reducers: {
        SET_TOKEN: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        DELETE_TOKEN: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null;
        },
    },
});

/**
 * SET_TOKEN : 토큰 저장
 * DELETE_TOKEN : 토큰 삭제
 */
export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
