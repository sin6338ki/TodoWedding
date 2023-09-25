import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const IncomeBudgetChart = ({ fianlTotalIncome, fianlTotalExpense }) => {

  const data = [
    { name: '수입', income: fianlTotalIncome },
    { name: '지출', expense: fianlTotalExpense }
  ];

  return (
    <span style={{position:'relative'}}>
    <ResponsiveContainer style={{position:'relative',left:"-20px"}} width="100%" height={200}>
      <BarChart data={data} layout="vertical" style={{margin : '-20px'}} barGap={-40}>
       
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#9966ff" name="Incomes" />
        <Bar dataKey="expense" fill="#4bc0c0" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
    </span>
  );
}

export default IncomeBudgetChart;