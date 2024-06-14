// src/components/TokenomicsChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const TokenomicsChart = () => {
  const data = {
    labels: ['Community', 'Team', 'Marketing', 'Liquidity', 'Charity'],
    datasets: [
      {
        data: [20, 10, 15, 45, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TokenomicsChart;
