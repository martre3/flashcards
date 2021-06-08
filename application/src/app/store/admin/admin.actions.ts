import { createAction, props } from '@ngrx/store';
import { Box } from '../../models/box';

export enum AdminActionTypes {
  LIST_BOXES = '[ADMIN] LIST_BOXES',
  LIST_BOXES_SUCCESS = '[ADMIN] LIST_BOXES_SUCCESS',
  CREATE_BOX = '[ADMIN] CREATE_BOX',
  CREATE_BOX_SUCCESS = '[ADMIN] CREATE_BOX_SUCCESS',
  DELETE_BOX = '[ADMIN] DELETE_BOX',
  SAVE = '[ADMIN] SAVE_BOX',
}

export const AdminActions = {
  listBoxes: createAction(AdminActionTypes.LIST_BOXES),
  listBoxesSuccess: createAction(AdminActionTypes.LIST_BOXES_SUCCESS, props<{ boxes: Box[] }>()),
  createBox: createAction(AdminActionTypes.CREATE_BOX),
  save: createAction(AdminActionTypes.SAVE, props<Box>()),
  deleteBox: createAction(AdminActionTypes.DELETE_BOX),
  createBoxSuccess: createAction(AdminActionTypes.CREATE_BOX_SUCCESS),
};
