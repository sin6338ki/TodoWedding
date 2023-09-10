import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux Toolkit의 createSlice 함수를 사용하여
 * 액션 생성자와 리듀서를 자동으로 생성하는 Redux 슬라이스를 정의
 * 로그인한 partner 정보 저장
 * 작성자 : 신지영
 * 작성일 : 2023.09.10
 */

export const partnerSlice = createSlice({
    /**
     * authenticated : 현재 로그인 여부 확인
     * accessToken : accessToken 저장
     * expireTime : 토큰 만료 시간
     */

    name: "partnerLoginInfo",
    initialState: {
        authenticatedPartner: false,
        partnerLoginInfo: null,
    },
    reducers: {
        SET_PARTNER_INFO: (state, action) => {
            state.authenticatedPartner = true;
            state.partnerLoginInfo = action.payload;
        },
        DELETE_PARTNER_INFO: (state) => {
            state.authenticatedPartner = true;
            state.partnerLoginInfo = null;
        },
    },
});

/**
 * SET_TOKEN : 토큰 저장
 * DELETE_TOKEN : 토큰 삭제
 */
export const { SET_PARTNER_INFO, DELETE_PARTNER_INFO } = partnerSlice.actions;

export default partnerSlice.reducer;
