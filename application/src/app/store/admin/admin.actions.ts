import { createAction } from '@ngrx/store';

export enum AdminActionTypes {
  LIST_BOXES = '[ADMIN] LIST_BOXES',
  LIST_BOXES_SUCCESS = '[ADMIN] LIST_BOXES_SUCCESS',
  CREATE_BOX = '[ADMIN] CREATE_BOX',
  CREATE_BOX_SUCCESS = '[ADMIN] CREATE_BOX_SUCCESS',
}

export const AdminActions = {
  listBoxes: createAction(AdminActionTypes.LIST_BOXES),
  listBoxesSuccess: createAction(AdminActionTypes.LIST_BOXES),
  createBox: createAction(AdminActionTypes.CREATE_BOX),
  createBoxSuccess: createAction(AdminActionTypes.LIST_BOXES_SUCCESS),
};
