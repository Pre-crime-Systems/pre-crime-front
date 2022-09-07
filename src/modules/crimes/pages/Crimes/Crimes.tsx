import React from 'react';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Table from '../../../../components/Table/Table';
import Input from '../../../../components/Input/Input';
import InputContainer from '../../components/InputContainer/InputContainer';
import './crimes.scss';

const Crimes: React.FC = () => {
  const columns = [
    {
      Header: 'Tipo',
      accessor: 'type',
      minWidth: 50,
    },
    {
      Header: 'Subtipo',
      accessor: 'subtype',
      minWidth: 100,
    },
    {
      Header: 'Modalidad',
      accessor: 'modality',
      minWidth: 100,
    },
    {
      Header: 'Dirección',
      accessor: 'address',
      minWidth: 120,
    },
    {
      Header: 'Zona',
      accessor: 'zone',
      minWidth: 100,
    },
    {
      Header: 'Estación de policía',
      accessor: 'station',
      minWidth: 120,
    },
    {
      Header: 'Fecha',
      accessor: 'date',
      minWidth: 50,
    },
    {
      Header: 'Hora',
      accessor: 'hour',
      minWidth: 50,
    },
  ];
  const data = [
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
    {
      type: 'AAA',
      subtype: 'Nombre',
      modality: 'Nombre',
      address: 'Dirección',
      zone: 'Zona',
      station: 'Direccion',
      date: '25/08/2022',
      hour: '19:20',
    },
  ];

  let crimesPageStatus = '--hidden';
  let addcrimePageStatus = '';

  return (
    <MainLayout className="crimesPage">
      <>
        <Card className="crimesPage__header">
          <h1>Crimes</h1>
          <Button
            onClick={() => {
              crimesPageStatus = '--hidden';
              addcrimePageStatus = ' ';
            }}
            buttonType="secondary"
          >
            Subir crímen
          </Button>
        </Card>
        <Card className={'crimesPage__content' + crimesPageStatus}>
          <Table columns={columns} data={data}></Table>
        </Card>
        <Card className={'addcrimePage' + addcrimePageStatus}>
          <section className="addcrimePage__header">
            <h1>Formulario de creación de crimen</h1>
            <Button
              onClick={() => {
                crimesPageStatus = ' ';
                addcrimePageStatus = '--hidden';
              }}
              className="addcrimePage__header__button"
              buttonType="secondary"
            >
              X
            </Button>
          </section>
          <form className="addcrimePage__content">
            <p className="addcrimePage__content__text">
              Estación de policía, fecha y hora:
            </p>
            <InputContainer className="addcrimePage__content__aux">
              <Input placeholder="Estación de policía"></Input>
              <Input placeholder="Fecha"></Input>
              <Input placeholder="Hora"></Input>
            </InputContainer>
            <p className="addcrimePage__content__text">
              Tipo de delito y modalidad
            </p>
            <InputContainer className="addcrimePage__content__aux">
              <Input placeholder="Tipo de delito"></Input>
              <Input placeholder="Subtipo de delito"></Input>
              <Input placeholder="Modalidad"></Input>
            </InputContainer>
            <p className="addcrimePage__content__text">Dirección y zona:</p>
            <InputContainer className="addcrimePage__content__aux">
              <Input placeholder="Dirección"></Input>
              <Input placeholder="Zona"></Input>
            </InputContainer>
            <p className="addcrimePage__content__text">Detalles:</p>
            <textarea
              className="addcrimePage__content__textarea"
              name="details"
              id="details"
            ></textarea>
          </form>
        </Card>
      </>
    </MainLayout>
  );
};

export default Crimes;
