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
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" name="Incomes" />
        <Bar dataKey="expense" fill="#82ca9d" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
    </span>
  );
}

export default IncomeBudgetChart;