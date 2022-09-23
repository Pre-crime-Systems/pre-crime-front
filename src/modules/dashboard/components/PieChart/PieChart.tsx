import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PIE_COLORS } from '../../../../constants/chart.constant';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  className?: string;
  data: any[];
}

const PieChart: React.FC<PieChartProps> = (props: PieChartProps) => {
  const { className, data } = props;

  const pieData = {
    labels: data.map((res) => res.label),
    datasets: [
      {
        data: data.map((res) => res.value),
        borderWidth: 1,
        ...PIE_COLORS,
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
      <Pie options={options} data={pieData} />
    </section>
  );
};

export default PieChart;
