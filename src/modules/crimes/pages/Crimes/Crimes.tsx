import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import Input from '../../../../components/Input/Input';
import './crimes.scss';

const Crimes: React.FC = () => {
  const columns = [
    {
      name: 'Tipo',
    },
    {
      name: 'Subtipo',
    },
    {
      name: 'Modalidad',
    },
    {
      name: 'Dirección',
    },
    {
      name: 'Zona',
    },
    {
      name: 'Estación de policía',
    },
    {
      name: 'Fecha',
    },
    {
      name: 'Hora',
    },
  ];
  return (
    <MainLayout className="crimesPage">
      <>
        <Card className="crimesPage__header">
          <h1>Crimes</h1> 
          <Button buttonType="secondary">Subir crímen</Button>
        </Card>
        <Card className="crimesPage__content">
          <Table columns={columns} data={[1, 2, 3, 4, 5, 6]}></Table>
        </Card>
        {/*
        <Card className="addcrimePage hidden">
          <section className="addcrimePage__header">
            <h1>Formulario de creación de crimen</h1> 
            <Button onClick={this.togglePopup} buttonType="secondary">X</Button>
          </section>
          <form className="addcrimePage__content">
            <p>Estación de policía, fecha y hora:</p>
            <div className="addcrimePage__content__aux">
              <Input placeholder="Estación de policía"></Input>
              <Input placeholder="Fecha"></Input>
              <Input placeholder="Hora"></Input>
            </div>
            <p>Tipo de delito y modalidad</p>
            <div className="addcrimePage__content__aux">
              <Input placeholder="Tipo de delito"></Input>
              <Input placeholder="Subtipo de delito"></Input>
              <Input placeholder="Modalidad"></Input>
            </div>
            <p>Dirección y zona:</p>
            <div className="addcrimePage__content__aux">
              <Input placeholder="Dirección"></Input>
              <Input placeholder="Zona"></Input>
            </div>
            <p>Detalles:</p>
            <textarea className="addcrimePage__content__textarea" name="details" id="details"></textarea>
          </form>
        </Card>
        */}
      </>
    </MainLayout>
  );
};

export default Crimes;