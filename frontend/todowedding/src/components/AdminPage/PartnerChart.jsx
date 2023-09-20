/**
 * Partner Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PartnerChart = ({ hallCnt, studioCnt }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["웨딩홀", "스튜디오"],
        datasets: [
            {
                label: "Partners(개)",
                data: [hallCnt, studioCnt],
                backgroundColor: ["rgba(4, 135, 217, 0.5)", "rgb(4, 135, 217)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)"],
                borderWidth: 0,
            },
        ],
    };
    return (
        <div>
            <Pie data={data} />
        </div>
    );
};

export default PartnerChart;
