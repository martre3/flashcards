import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { AuthResponse } from '../../models/responses/auth-response';

export enum AuthActionTypes {
  LOGIN = '[AUTH] LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS',
  SIGNUP = '[AUTH] SIGNUP',
  SIGNUP_SUCCESS = '[AUTH] SIGNUP_SUCCESS',
  LOGOUT = '[AUTH] LOGOUT',
}

export class Login implements Action {
  public type = AuthActionTypes.LOGIN;

  constructor(public payload: User) {}
}

export class LoginSuccess implements Action {
  public type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: AuthResponse) {}
}

export class Logout implements Action {
  public type = AuthActionTypes.LOGOUT;
}

export class SignUp implements Action {
  public type = AuthActionTypes.SIGNUP;

  constructor(public payload: User) {}
}

export class SignUpSuccess implements Action {
  public type = AuthActionTypes.SIGNUP_SUCCESS;
}

export type AuthActions = Login | LoginSuccess | Logout | SignUp | SignUpSuccess;
