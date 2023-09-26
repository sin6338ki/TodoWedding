import axios from "axios";
import React from "react";
import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";
import PartnerChart from "./PartnerChart";

const Dashboard = ({ partners, members, maleCnt, femaleCnt, twentyCnt, thirtyCnt, fourtyCnt, hallCnt, studioCnt }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border shadow-md text-black ml-4 mt-2">
                <div className="text-lg text-[#465973] m-4">Total User</div>
                <div className="text-5xl m-4 text-[#2C3540]">{members.length}</div>
            </div>
            <div className="rounded-md border shadow-md text-black mr-4 mt-2">
                <div className="text-lg text-[#465973] m-4">Total Partner</div>
                <div className="text-5xl m-4 text-[#2C3540]">{partners.length}</div>
            </div>
            <div className="col-span-2 px-5 pt-5">
                <div className="pb-4 font-bold text-[#465973] underline underline-offset-4">User 성별 통계</div>
                <GenderChart maleCnt={maleCnt} femaleCnt={femaleCnt} className="w-2/3"/>
            </div>
            <div className="col-span-2 px-5">
                <div className="pb-4 font-bold text-[#465973] underline underline-offset-4">User 연령대 통계</div>
                <AgeChart twentyCnt={twentyCnt} thirtyCnt={thirtyCnt} fourtyCnt={fourtyCnt} className="w-2/3" />
            </div>
            <div className="col-span-2 px-5 font-bold text-[#465973] underline underline-offset-4">
                <div className="pb-4">제휴업체 유형 통계</div>
                <PartnerChart hallCnt={hallCnt} studioCnt={studioCnt} className="w-2/3" />
            </div>
        </div>
    );
};

export default Dashboard;
