import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const BudgetRoleChart = ({ broomPercentage, bridePercentage, bothPercentage, etcPercentage }) => {
    const data = [
        { name: "신부", value: Math.round(bridePercentage) },
        { name: "신랑", value: Math.round(broomPercentage) },
        { name: "공동", value: Math.round(bothPercentage )},
        { name: "기타", value: Math.round(etcPercentage) },
    ];

    const COLORS = ["#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];
    

    return (
        <div>
            <PieChart width={400} height={200}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                {/* <Tooltip  /> */}
                <Tooltip formatter={(value) => `${Math.round(value)}`} />
            </PieChart>
        </div>
    );
};

export default BudgetRoleChart;
