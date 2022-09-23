import React, { createContext, Dispatch, useReducer } from 'react';
import { ReportActions, reportReducer, ReportTypes } from './report.reducer';

export type InitialStateType = {
  list: ReportTypes;
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

const ContextReport = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ReportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ list }: InitialStateType, action: any) => ({
  list: reportReducer(list, action),
});

interface ContextReportProviderProps {
  children?: React.ReactNode;
}
const ContextReportProvider: React.FC<ContextReportProviderProps> = (
  props: ContextReportProviderProps
) => {
  const { children } = props;
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ContextReport.Provider value={{ state, dispatch }}>
      {children}
    </ContextReport.Provider>
  );
};

export { ContextReportProvider, ContextReport };
