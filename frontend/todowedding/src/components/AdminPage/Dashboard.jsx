import axios from "axios";
import React from "react";
import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";
import PartnerChart from "./PartnerChart";

const Dashboard = ({ partners, members, maleCnt, femaleCnt, twentyCnt, thirtyCnt, fourtyCnt, hallCnt, studioCnt }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">Total User</div>
                <div className="text-6xl m-4 text-[#b66dff]">{members.length}</div>
            </div>
            <div className="rounded-md border shadow-md text-black">
                <div className="text-xl text-gray-500 m-4">Total Partner</div>
                <div className="text-6xl m-4 text-[#fe7c96]">{partners.length}</div>
            </div>
            <div className="my-5 w-full m-auto">
                <div className="my-3 pb-4 font-bold text-gray-500 underline underline-offset-4">User 성별 통계</div>
                <GenderChart maleCnt={maleCnt} femaleCnt={femaleCnt} />
            </div>
            <div className="my-5  w-full m-auto">
                <div className="my-3 pb-4 font-bold text-gray-500 underline underline-offset-4">User 연령대 통계</div>
                <AgeChart twentyCnt={twentyCnt} thirtyCnt={thirtyCnt} fourtyCnt={fourtyCnt} className="w-2/3" />
            </div>
            <div className="col-span-2 my-5 px-5 font-bold text-gray-500 underline underline-offset-4">
                <div className="my-3 pb-4">제휴업체 유형 통계</div>
                <PartnerChart hallCnt={hallCnt} studioCnt={studioCnt} className="w-2/3" />
            </div>
        </div>
    );
};

export default Dashboard;
