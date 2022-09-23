import { ActionMap } from '../../../models/actionMap.model';

export type ReportModalMode = 'add' | 'edit' | 'detail';

interface IModal {
  active: boolean;
  mode: ReportModalMode;
  data: any;
}

interface ITable {
  data: any;
  loading: boolean;
}

export type ReportTypes = {
  modal: IModal;
  table: ITable;
};

export enum Types {
  SetModal = 'SET_MODAL',
  SetTable = 'SET_TABLE',
}

type ReportPayload = {
  [Types.SetModal]: IModal;
  [Types.SetTable]: ITable;
};

export type ReportActions =
  ActionMap<ReportPayload>[keyof ActionMap<ReportPayload>];

export const reportReducer = (state: ReportTypes, action: ReportActions) => {
  switch (action.type) {
    case Types.SetModal:
      return {
        ...state,
        modal: action.payload,
      };
    case Types.SetTable:
      return {
        ...state,
        table: action.payload,
      };
    default:
      return state;
  }
};
