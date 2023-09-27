import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const IncomeBudgetChart = ({ fianlTotalIncome, fianlTotalExpense }) => {

  const data = [
    { name: '수입', income: fianlTotalIncome },
    { name: '지출', expense: fianlTotalExpense }
  ];

  return (
    <span style={{position:'relative'}}>
    <ResponsiveContainer style={{position:'relative',left:"-20px"}} width="100%" height={160}>
      <BarChart data={data} layout="vertical" style={{margin : '-15px'}} barGap={-35}>
       
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#f5a2b6" name="Incomes" />
        <Bar dataKey="expense" fill="#a6bbf5" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
    </span>
  );
}

export default IncomeBudgetChart;