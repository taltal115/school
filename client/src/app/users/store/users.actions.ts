import {Action} from '@ngrx/store'
import {Ticket} from "../../tickets/ticket.model";
import {User} from "../../models/user";
// import {User} from "../../models/user";
export const FETCH_USERS = 'FETCH_USERS';
export const SET_USERS = 'SET_USERS';
export const DELETE_USER = 'DELETE_USER';

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class SetUsers implements Action {
  readonly type = SET_USERS;
  constructor(public payload: any[]) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(public payload: {index: number, user: User}) {}
}

export type UsersActions = FetchUsers | SetUsers | DeleteUser;
