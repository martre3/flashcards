import { AuthActions, AuthActionTypes, LoginSuccess } from './auth.actions';
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
        user: (action as LoginSuccess).payload.user,
        jwt: (action as LoginSuccess).payload.jwt,
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
