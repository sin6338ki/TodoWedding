/**
 * Gender Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const GenderChart = ({ maleCnt, femaleCnt }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["남성", "여성"],
        datasets: [
            {
                label: "Users(명)",
                data: [maleCnt, femaleCnt],
                backgroundColor: ["rgba(153, 102, 255, 0.2)", "rgba(153, 102, 255, 0.8)"],
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

export default GenderChart;
