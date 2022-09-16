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
import { CHART_COLORS } from '../../../../constants/chart.constant';

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
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 1000),
        ...CHART_COLORS[0],
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 1000),
        ...CHART_COLORS[1],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
