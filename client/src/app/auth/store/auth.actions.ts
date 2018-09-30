import { Action } from '@ngrx/store';


export const
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Sign Up',
  SIGNUP_SUCCESS = '[Auth] Sign Up Success',
  SIGNUP_FAILURE = '[Auth] Sign Up Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  SET_TOKEN = 'SET_TOKEN',
  FETCH_USERS = 'FETCH_USERS';


export class LogIn implements Action {
  readonly type = LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class GetStatus implements Action {
  readonly type = GET_STATUS;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: any) {}
}

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | GetStatus
  | SetToken
  | FetchUsers;
