import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const BudgetRoleChart = ({ brideCnt, broomCnt, bothCnt, etcCnt }) => {
  const data = [
    { name: '신부', value: brideCnt },
    { name: '신랑', value: broomCnt },
    { name: '공동', value: bothCnt },
    { name: '기타', value: etcCnt }
  ];

  const COLORS = ['#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

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
