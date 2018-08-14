// // import * as fromShoppingList from './../shopping-list/store/shopping-list.reducers'
// import * as fromAuth from './../auth/store/auth.reducers'
// import {ActionReducerMap} from '@ngrx/store';
//
// export interface AppState {
//   // shoppingList: fromShoppingList.State,
//   auth: fromAuth.State
// }
//
// export const reducers: ActionReducerMap<AppState> = {
//   // shoppingList: fromShoppingList.shoppingListReducer,
//   auth: fromAuth.authReducer
// };

import * as auth from './../auth/store/auth.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
