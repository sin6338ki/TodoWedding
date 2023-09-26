/* 예산 관리 Total Expense 
          : 지출 분담 chart 
 * 작성자 : 양수진
 * 작성일 : 2023.09.14
 */



import React from "react";
import { PieChart, Pie, Cell, Tooltip , Legend} from "recharts";

const BudgetRoleChart = ({ broomPercentage, bridePercentage, bothPercentage, etcPercentage }) => {
    const data = [
        { name: "신부", value: Math.round(bridePercentage) },
        { name: "신랑", value: Math.round(broomPercentage) },
        { name: "공동", value: Math.round(bothPercentage )},
        { name: "기타", value: Math.round(etcPercentage) },
    ];

    const COLORS = ["#ffbdbd", "#a8cbff", "#cdb0ff", "#94f2ce"];


    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100px', marginLeft:'30px', marginBottom:"30%"}}>
            
            <PieChart width={400} height={220}>
                {/* 신랑신부공동기타 올리려면 verticalAlign을 top으로 수정 (09.26) */}
                <Legend layout="vertical" verticalAlign="bottom" align="left-bottom" />
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
                <Tooltip formatter={(value) => `${Math.round(value)}`} />
            </PieChart>
        </div>
    );
};

export default BudgetRoleChart;
