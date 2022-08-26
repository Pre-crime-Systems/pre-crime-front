import React from 'react';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import LineChart from '../../components/LineChart/LineChart';
import BarChart from '../../components/BarChart/BarChart';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <MainLayout className="dashboardPage">
      <section className="dashboardPage__cards">
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Evolución de crímenes</h2>
          </div>
          <div>
            <LineChart />
          </div>
        </Card>
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Cantidad de delitos</h2>
          </div>
          <div>
            <BarChart />
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
