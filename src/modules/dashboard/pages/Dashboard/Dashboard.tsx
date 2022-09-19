import React from 'react';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Select from '../../../../components/Select/Select';
import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <MainLayout className="dashboardPage">
      <section className="dashboardPage__cards">
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Crimen por tipo de delito</h2>
            <Select
              placeholder="Filtro por mes"
              options={[
                { label: 'Enero', value: 1 },
                { label: 'Febrero', value: 2 },
                { label: 'Marzo', value: 3 },
                { label: 'Abril', value: 4 },
              ]}
            />
          </div>
          <div>
            <PieChart />
          </div>
        </Card>
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Cantidad de crímenes</h2>
            <Select
              placeholder="Filtro por tiempo"
              options={[
                { label: 'Hoy', value: 1 },
                { label: 'Mes', value: 2 },
                { label: 'Año', value: 3 },
              ]}
            />
          </div>
          <div>
            <LineChart />
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
