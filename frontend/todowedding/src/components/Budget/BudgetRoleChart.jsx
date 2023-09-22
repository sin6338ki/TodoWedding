import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const BudgetRoleChart = ({ broomPercentage, bridePercentage, bothPercentage, etcPercentage }) => {
    const data = [
        { name: "신부", value: bridePercentage },
        { name: "신랑", value: broomPercentage },
        { name: "공동", value: bothPercentage },
        { name: "기타", value: etcPercentage },
    ];

    const COLORS = ["#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];

    return (
        <div>
            <PieChart width={200} height={150}>
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
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default BudgetRoleChart;
