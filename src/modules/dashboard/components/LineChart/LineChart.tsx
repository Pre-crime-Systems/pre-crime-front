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
import { Line } from 'react-chartjs-2';
import { LINE_COLOR } from '../../../../constants/chart.constant';

interface LineChartProps {
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

const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { className } = props;
  const response = [
    {
      label: 'Enero',
      value: Math.random(),
    },
    {
      label: 'Febrero',
      value: Math.random(),
    },
    {
      label: 'Marzo',
      value: Math.random(),
    },
    {
      label: 'Abril',
      value: Math.random(),
    },
    {
      label: 'Mayo',
      value: Math.random(),
    },
  ];

  const data = {
    labels: response.map((res) => res.label),
    datasets: [
      {
        data: response.map((res) => res.value),
        ...LINE_COLOR,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <section className={className && className}>
      <Line options={options} data={data} />
    </section>
  );
};

export default LineChart;
