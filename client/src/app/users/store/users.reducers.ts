import {User} from '../../models/user';
import * as UsersActions from './users.actions';
import * as fromApp from '../../store/app.reducers';
import * as TicketActions from "../../tickets/store/ticket.actions";

export interface FeatureState extends fromApp.AppState{
  users: State
}

export interface State {
  users: User[];
}

const initialState: State = {
  users: []
};

export function userReducer(state = initialState, action: UsersActions.UsersActions) {
  switch(action.type) {
    case (UsersActions.SET_USERS):
      const resObj = {
        ...state,
        users: [...state.users, ...action.payload]
      };
      return resObj;
    case (UsersActions.DELETE_USER):
      const oldUsers = [...state.users];
      oldUsers.splice(action.payload.index,1);
      console.log('deleted with redux!');
      return {
        ...state,
        users: oldUsers
      };
    case (UsersActions.UPDATE_USER):
      const user = state.users[action.payload.index];
      const updatedUsers = {
        ...user,
        ...action
      };
      const users = [...state.users];
      users[action.payload.index] = updatedUsers;
      return {
        ...state,
        users: users
      };
    default:
      return state;
  }
}
