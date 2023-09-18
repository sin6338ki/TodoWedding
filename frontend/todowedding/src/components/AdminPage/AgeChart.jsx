/**
 * Age Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const AgeChart = ({ twentyCnt, thirtyCnt, fourtyCnt }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["20대", "30대", "40대"],
        datasets: [
            {
                label: "Users(명)",
                data: [twentyCnt, thirtyCnt, fourtyCnt],
                backgroundColor: ["rgba(254, 117, 150, 0.2)", "rgba(254, 117, 150, 0.8)", "rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
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

export default AgeChart;
