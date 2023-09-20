import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import BudgetIndex from './BudgetIndex';
import BudgetDashboard from './BudgetDashboard';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '수입/지출 Chart',
      },
    },
  };

const IncomeBudgetChart = ({expenses , incomes}) => {


    const data = {
        labels: ['budgets', 'Incomes'],
        datasets: [
          {
            label: 'incomes',
            data: [incomes],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'budgets',
            data: [expenses],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


  return (
    <div>
        <Bar options={options} data={data} />;
    </div>
  )
}

export default IncomeBudgetChart