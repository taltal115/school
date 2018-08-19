// import * as fromShoppingList from './../shopping-list/store/shopping-list.reducers'
// import * as fromAuth from './../auth/store/auth.reducers'
// import { ActionReducerMap } from '@ngrx/store';
//
// export interface AppState {
//   shoppingList: fromShoppingList.State,
//   auth: fromAuth.State
// }
//
// export const reducers: ActionReducerMap<AppState> = {
//   shoppingList: fromShoppingList.shoppingListReducer,
//   auth: fromAuth.authReducer
// };


import * as fromAuth from './../auth/store/auth.reducers';
import * as fromUser from './../users/store/users.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  authState: fromAuth.State;
  users: fromUser.State;
}

export const reducers = {
  auth: fromAuth.reducer,
  users: fromUser.userReducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectUserState = createFeatureSelector<AppState>('users');
