import {Action} from '@ngrx/store'
// import {User} from "../../models/user";
export const FETCH_USERS = 'FETCH_USERS';
export const SET_USERS = 'SET_USERS';

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class SetUsers implements Action {
  readonly type = SET_USERS;
  constructor(public payload: any[]) {}
}

export type UsersActions = FetchUsers | SetUsers;
