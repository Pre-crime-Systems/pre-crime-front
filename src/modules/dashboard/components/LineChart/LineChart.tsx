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

interface LineChartProps {
  className?: string;
  data: any[];
}

const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { className, data } = props;

  const lineData = {
    labels: data.map((res) => res.label),
    datasets: [
      {
        data: data.map((res) => res.value),
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
      <Line options={options} data={lineData} />
    </section>
  );
};

export default LineChart;
