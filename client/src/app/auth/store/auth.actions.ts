import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const FETCH_USERS = 'FETCH_USERS';

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {userObject: any}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}


export type AuthActions =
    Signin |
    Signup |
    Logout |
    SetToken |
    TrySignup |
    TrySignin |
    FetchUsers;
