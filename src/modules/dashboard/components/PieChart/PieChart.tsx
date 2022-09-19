import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PIE_COLORS } from '../../../../constants/chart.constant';

interface PieChartProps {
  className?: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = (props: PieChartProps) => {
  const { className } = props;
  const response = [
    {
      label: 'Delito contra el patrimonio',
      value: 50,
    },
    {
      label: 'Delito contra la vida, el cuerpo y salud',
      value: 20,
    },
    {
      label: 'Delito contra la seguridad pública',
      value: 30,
    },
  ];

  const data = {
    labels: response.map((res) => res.label),
    datasets: [
      {
        data: response.map((res) => res.value),
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
      <Pie options={options} data={data} />
    </section>
  );
};

export default PieChart;
