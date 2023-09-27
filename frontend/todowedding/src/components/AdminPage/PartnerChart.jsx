/**
 * Partner Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const PartnerChart = ({ hallCnt, studioCnt }) => {
    const data = [
        { name: "웨딩홀", value: Math.round((hallCnt / (hallCnt + studioCnt)) * 100) },
        { name: "스튜디오", value: Math.round((studioCnt / (hallCnt + studioCnt)) * 100) },
    ];
    const COLORS = ["#ffbdbd", "#a8cbff", "#cdb0ff", "#94f2ce"];

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PieChart width={400} height={220}>
                <Legend layout="vertical" verticalAlign="middle" align="left-bottom" />
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default PartnerChart;
