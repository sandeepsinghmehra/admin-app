"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart',
      },
    },
};

const LineChart: React.FC<any> = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
    // Extract data from chartData to use for chart
  const chartData = {
    labels: Object.keys('abc'),
    datasets: [
            {
                label: 'Chart labal',
                data: Object.values('abc'),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };
    return (
        <Line options={options} data={chartData} /> 
    )
}

export default LineChart