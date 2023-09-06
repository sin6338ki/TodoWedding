import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/scss/style.scss";
import reportWebVitals from "./reportWebVitals";

//tailwindcss 적용
import "./tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
