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
                backgroundColor: ["rgba(242, 160, 61, 0.5)", "rgba(242, 160, 61)"],
                borderColor: ["rgba(44, 53, 64)", "rgba(44, 53, 64, 0.5)"],
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
