import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/scss/style.scss";

//tailwindcss 적용
import "./tailwind.css";

/**토큰 저장 관련 */
import store from "./redux/configStore";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
// axios.defaults.withCredentials = true;
root.render(
    <CookiesProvider>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </CookiesProvider>
);
