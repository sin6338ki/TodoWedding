import { persistReducer } from "redux-persist";
import { AuthReducer } from "./reducers/AuthReducer";
import { createStore, combineReducers } from "redux";
// local storage 사용
import storage from "redux-persist/lib/storage";
import { PartnerAuthReducer } from "./reducers/PartnerAuthReducer";

const persistConfig = {
    key: "root",
    //local storage에 저장
    storage: storage,
};

// kakao 로그인 후 바로 렌더링 (09.13)
const initialState = {
    kakaoUserNick: "",
};
// 로그인, 로그아웃 초기화 (09.13)
function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, kakaoUserNick: action.kakaoUserNick };
        case "LOGOUT":
            return { ...state, kakaoUserNick: "" }; // 로그아웃 시 닉네임 초기화
        default:
            return state;
    }
}

const allReducers = combineReducers({
    Auth: AuthReducer,
    PartnerAuth: PartnerAuthReducer,
    User: userReducer //새로 추가한 리듀서 (09.13)
});

//todo-redux(09.15)
const TOGGLE_CHECKED = 'TOGGLE_CHECKED'
const toggleChecked = (todolistSeq) =>{
    return {
        type:TOGGLE_CHECKED,
        payload:todolistSeq
    }
}

const store = createStore(
    persistReducer(persistConfig, allReducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
