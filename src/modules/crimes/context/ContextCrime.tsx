import React, { createContext, Dispatch, useReducer } from 'react';
import { CrimeActions, crimeReducer, CrimeTypes } from './crime.reducer';

export type InitialStateType = {
  list: CrimeTypes;
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

const ContextCrime = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CrimeActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ list }: InitialStateType, action: any) => ({
  list: crimeReducer(list, action),
});

interface ContextCrimeProviderProps {
  children?: React.ReactNode;
}
const ContextCrimeProvider: React.FC<ContextCrimeProviderProps> = (
  props: ContextCrimeProviderProps
) => {
  const { children } = props;
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ContextCrime.Provider value={{ state, dispatch }}>
      {children}
    </ContextCrime.Provider>
  );
};

export { ContextCrimeProvider, ContextCrime };
