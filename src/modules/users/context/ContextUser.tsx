import React, { createContext, Dispatch, useReducer } from 'react';
import { UserActions, userReducer, UserTypes } from './user.reducer';

export type InitialStateType = {
  list: UserTypes;
};

const initialState: InitialStateType = {
  list: {
    table: {
      loading: false,
      data: null,
    },
    modal: {
      active: false,
      mode: 'add',
      data: null,
    },
  },
};

const ContextUser = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ list }: InitialStateType, action: any) => ({
  list: userReducer(list, action),
});

interface ContextUserProviderProps {
  children?: React.ReactNode;
}
const ContextUserProvider: React.FC<ContextUserProviderProps> = (
  props: ContextUserProviderProps
) => {
  const { children } = props;
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ContextUser.Provider value={{ state, dispatch }}>
      {children}
    </ContextUser.Provider>
  );
};

export { ContextUserProvider, ContextUser };
