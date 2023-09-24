import axios from "axios";
import React, { useState } from "react";

const CorpsLogin = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const loginUserInfo = {
        id: `${id}`,
        pw: `${pw}`,
    };

    const corpsloginClick = () => {
        console.log("로그인 버튼 클릭");

        if (id == "" || pw == "") {
            alert("아이디 또는 비밀번호를 입력해주세요");
        } else {
            console.log("spring 넘기는 값", loginUserInfo);
            axios.post("http://3.36.116.165:8085", loginUserInfo); // 기업로그인 경로 확인하기
        }
    };

    return <div>CorpsLogin</div>;
};

export default CorpsLogin;
