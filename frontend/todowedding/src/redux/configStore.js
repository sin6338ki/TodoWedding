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

const allReducers = combineReducers({
    Auth: AuthReducer,
    PartnerAuth: PartnerAuthReducer,
});

const store = createStore(
    persistReducer(persistConfig, allReducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
