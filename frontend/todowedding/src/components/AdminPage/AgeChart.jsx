/**
 * Age Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const AgeChart = ({ twentyCnt, thirtyCnt, fourtyCnt }) => {
    const data = [
        { name: "20대", value: Math.round((twentyCnt / (twentyCnt + thirtyCnt + fourtyCnt)) * 100) },
        { name: "30대", value: Math.round((thirtyCnt / (twentyCnt + thirtyCnt + fourtyCnt)) * 100) },
        { name: "40대", value: Math.round((fourtyCnt / (twentyCnt + thirtyCnt + fourtyCnt)) * 100) },
    ];
    const COLORS = ["#FFDB61", "#FFB7B7", "#BAB7FF", "#94f2ce"];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "100px",
                marginLeft: "-10%",
                marginBottom: "40%",
            }}
        >
            <PieChart width={370} height={220} style={{ marginLeft: "12%" }}>
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

export default AgeChart;
