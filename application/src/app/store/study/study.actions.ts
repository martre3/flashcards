import { createAction, props } from '@ngrx/store';
import { Card } from '../../models/card';
import { SubmitAnswersPayload } from '../../models/store/submit-answers.payload';

export enum StudyActionTypes {
  GET_CARD = '[STUDY] GET_CARD',
  GET_CARD_SUCCESS = '[STUDY] GET_CARD_SUCCESS',
  SUBMIT = '[STUDY] SUBMIT',
  // SUBMIT_SUCCESS = '[STUDY] SUBMIT_SUCCESS',
}

export const StudyActions = {
  getCard: createAction(StudyActionTypes.GET_CARD),
  submit: createAction(StudyActionTypes.SUBMIT, props<SubmitAnswersPayload>()),
  getCardSuccess: createAction(StudyActionTypes.GET_CARD_SUCCESS, props<{ card: Card }>()),
};
