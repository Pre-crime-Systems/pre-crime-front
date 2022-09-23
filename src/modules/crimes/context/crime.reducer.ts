import { ActionMap } from '../../../models/actionMap.model';

export type CrimeModalMode = 'add' | 'edit' | 'detail';

interface IModal {
  active: boolean;
  mode: CrimeModalMode;
  data: any;
}

interface ITable {
  data: any;
  loading: boolean;
}

export type CrimeTypes = {
  modal: IModal;
  table: ITable;
};

export enum Types {
  SetModal = 'SET_MODAL',
  SetTable = 'SET_TABLE',
}

type CrimePayload = {
  [Types.SetModal]: IModal;
  [Types.SetTable]: ITable;
};

export type CrimeActions =
  ActionMap<CrimePayload>[keyof ActionMap<CrimePayload>];

export const crimeReducer = (state: CrimeTypes, action: CrimeActions) => {
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
