import {
  AuthActions,
  AuthActionTypes,
  LoginSuccess,
  UpdateCurrentUserSuccess,
} from './auth.actions';
import { restoreState } from '../store-utils';
import { User } from '../../models/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  jwt: string;
}

const initialStateTemplate: AuthState = {
  isAuthenticated: false,
  user: undefined,
  jwt: '',
};

const initialState: AuthState = restoreState<AuthState>('auth', initialStateTemplate, localStorage);

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        jwt: (action as LoginSuccess).payload.jwt,
      };
    case AuthActionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: { ...(action as UpdateCurrentUserSuccess).payload },
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...initialStateTemplate,
      };
    default:
      return {
        ...state,
      };
  }
};
