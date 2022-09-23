import { ActionMap } from '../../../models/actionMap.model';

export type UserModalMode = 'add' | 'edit' | 'detail';

interface IModal {
  active: boolean;
  mode: UserModalMode;
  data: any;
}

interface ITable {
  data: any;
  loading: boolean;
}

export type UserTypes = {
  modal: IModal;
  table: ITable;
};

export enum Types {
  SetModal = 'SET_MODAL',
  SetTable = 'SET_TABLE',
}

type UserPayload = {
  [Types.SetModal]: IModal;
  [Types.SetTable]: ITable;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: UserTypes, action: UserActions) => {
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
