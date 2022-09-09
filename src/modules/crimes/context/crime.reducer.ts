import { ActionMap } from '../../../models/actionMap.model';

interface IModal {
  active: boolean;
  mode: 'add' | 'edit';
  data: any;
}

export type CrimeTypes = {
  modal: IModal;
};

export enum Types {
  SetModal = 'SET_MODAL',
}

type CrimePayload = {
  [Types.SetModal]: IModal;
};

export type CrimeActions =
  ActionMap<CrimePayload>[keyof ActionMap<CrimePayload>];

export const crimeReducer = (state: CrimeTypes, action: CrimeActions) => {
  switch (action.type) {
    case Types.SetModal:
      console.log('1', action.payload);
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};
