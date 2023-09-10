import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import partnerReducer from "./PartnerLoginInfo";
/**
 * reducr 사용하기 위한 configureStore 선언
 * 작성자 : 신지영
 * 작성일 : 2023.09.09
 */

export default configureStore({
    reducer: {
        authToken: tokenReducer,
        partnerLoginInfo: partnerReducer,
    },
});
