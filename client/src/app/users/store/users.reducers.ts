import {User} from '../../models/user';
import * as UsersActions from './users.actions';
import * as fromApp from '../../store/app.reducers';

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
    // case (TicketActions.SET_TICKETS):
    //   return {
    //     ...state,
    //     tickets: [...action.payload]
    //   };
    // // case (RecipeActions.ADD_RECIPE):
    // //   return {
    // //     ...state,
    // //     recipes: [...state.recipes, action.payload]
    // //   };
    // // case (RecipeActions.UPDATE_RECIPE):
    // //   const recipe = state.recipes[action.payload.index];
    // //   const updatedRecipe = {
    // //     ...recipe,
    // //     ...action.payload.updatedRecipe
    // //   };
    // //   const recipes = [...state.recipes];
    // //   recipes[action.payload.index] = updatedRecipe;
    // //   return {
    // //     ...state,
    // //     recipes: recipes
    // //   };
    // case (TicketActions.DELETE_TICKET):
    //   const oldTickets = [...state.tickets];
    //   oldTickets.splice(action.payload.index,1);
    //   console.log('deleted with redux!');
    //   return {
    //     ...state,
    //     tickets: oldTickets
    //   };
    default:
      return state;
  }
}
