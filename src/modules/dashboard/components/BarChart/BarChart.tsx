import React from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  className?: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const { className } = props;

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels2 = ['January', 'February', 'March'];

  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels2.map(() => 1000),
      },
      {
        label: 'Dataset 2',
        data: labels2.map(() => 1000),
      },
    ],
  };

  return (
    <section className={className && className}>
      <Bar options={options2} data={data2} />
    </section>
  );
};

export default BarChart;
