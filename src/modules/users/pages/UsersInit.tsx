import React from 'react';
import { ContextUserProvider } from '../context/ContextUser';
import Users from './Users/Users';

const UsersInit: React.FC = () => {
  return (
    <ContextUserProvider>
      <Users />
    </ContextUserProvider>
  );
};

export default UsersInit;
