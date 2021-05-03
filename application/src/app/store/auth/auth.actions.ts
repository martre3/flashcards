import { Action, createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { User } from '../../models/user';
import { AuthResponse } from '../../models/responses/auth-response';
import { SocialLoginPayload } from '../../models/store/social-login.payload';

export enum AuthActionTypes {
  LOGIN = '[AUTH] LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS',
  SOCIAL_LOGIN = '[AUTH] SOCIAL_LOGIN',
  SOCIAL_LOGIN_SUCCESS = '[AUTH] SOCIAL_LOGIN_SUCCESS',
  SIGNUP = '[AUTH] SIGNUP',
  SIGNUP_SUCCESS = '[AUTH] SIGNUP_SUCCESS',
  LOGOUT = '[AUTH] LOGOUT',
  UPDATE_CURRENT_USER = '[AUTH] UPDATE_CURRENT_USER',
  UPDATE_CURRENT_USER_SUCCESS = '[AUTH] UPDATE_CURRENT_USER_SUCCESS',
}

export const AuthActions = {
  socialLogin: createAction(AuthActionTypes.SOCIAL_LOGIN, props<SocialLoginPayload>()),
  socialLoginSuccess: createAction(AuthActionTypes.SOCIAL_LOGIN_SUCCESS, props<SocialUser>()),
};

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

export class UpdateCurrentUser implements Action {
  public type = AuthActionTypes.UPDATE_CURRENT_USER;
}

export class UpdateCurrentUserSuccess implements Action {
  public type = AuthActionTypes.UPDATE_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | Logout
  | SignUp
  | SignUpSuccess
  | UpdateCurrentUser
  | UpdateCurrentUserSuccess;
