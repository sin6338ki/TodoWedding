import React, { useState } from "react";
import { useSelector } from "react-redux";
import PartnerBottomBar from "./PartnerBottomBar";
import MemberBottomBar from "./MemberBottomBar";

/*
 * BottomBar
 * 작성자 : 서현록
 * 작성일 : 2023.09.05
 */

function BottomBar() {
    const [add, setAdd] = useState(false);
    const token = useSelector((state) => state.Auth.token);

    return (
        <>
            {token.type == "P" && <PartnerBottomBar />}
            {token == null && <MemberBottomBar />}
            {token.type == "N" && <MemberBottomBar />}
        </>
    );
}

export default BottomBar;
