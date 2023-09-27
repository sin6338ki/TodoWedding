/**
 * Gender Chart (react-chartjs-2)
 * 작성자 : 신지영
 * 작성일 : 2023.09.18
 */

import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const GenderChart = ({ maleCnt, femaleCnt }) => {
    const data = [
        { name: "남성", value: Math.round((maleCnt / (maleCnt + femaleCnt)) * 100) },
        { name: "여성", value: Math.round((femaleCnt / (maleCnt + femaleCnt)) * 100) },
    ];
    const COLORS = ["#a8cbff", "#FFB593", "#cdb0ff", "#94f2ce"];

    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100px', marginLeft:"-10%", marginBottom:"40%"}}>
            <PieChart width={370} height={220} style={{marginLeft:"12%"}}>
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

export default GenderChart;
