import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import Pagination from '../../../../components/Pagination/Pagination';
import Table from '../../../../components/Table/Table';
import { useApi } from '../../../../hooks/useApi';
import { getUsersWithPagination } from '../../../../services/user.service';
import { ContextUser } from '../../context/ContextUser';
import { Types } from '../../context/user.reducer';
import { ROLES } from '../../../../constants/user.constant';
import './usersTable.scss';

const UsersTable: React.FC = () => {
  const { state, dispatch } = useContext(ContextUser);
  const { data: usersResponse, loading } = state?.list?.table;
  const [responseEndpoint, callEndpoint] = useApi();

  const renderRole = (data: any) => {
    const role = data?.cell?.row?.original?.role;
    return <p>{ROLES[role] || role}</p>;
  };

  const columns = [
    {
      Header: 'Nombre',
      accessor: 'firstName',
      minWidth: 100,
    },
    {
      Header: 'Apellido',
      accessor: 'lastName',
      minWidth: 100,
    },
    {
      Header: 'Usuario',
      accessor: 'username',
      minWidth: 100,
    },
    {
      Header: 'Correo',
      accessor: 'email',
      minWidth: 100,
    },
    {
      Header: 'Rol',
      id: 'role',
      Cell: (data: any) => renderRole(data),
      minWidth: 100,
    },
  ];

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      dispatch({
        type: Types.SetTable,
        payload: {
          data: responseEndpoint?.data,
          loading: false,
        },
      });
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (!loading && usersResponse === null) {
      dispatch({
        type: Types.SetTable,
        payload: {
          data: null,
          loading: true,
        },
      });
      callEndpoint(getUsersWithPagination());
    }
  }, [usersResponse]);

  return (
    <Card className="usersTable">
      {loading && <Loading />}
      {usersResponse && (
        <Table columns={columns} data={usersResponse.content} />
      )}
      {usersResponse && (
        <Pagination
          page={usersResponse?.number + 1}
          size={usersResponse?.size}
          total={usersResponse?.totalElements}
          onPageChange={(current: number) => {
            dispatch({
              type: Types.SetTable,
              payload: {
                data: null,
                loading: true,
              },
            });
            callEndpoint(getUsersWithPagination(current - 1));
          }}
        />
      )}
    </Card>
  );
};

export default UsersTable;
