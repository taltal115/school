import {Ticket} from '../ticket.model';
import * as TicketActions from './ticket.actions';
import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from "../../recipes/store/recipe.actions";

export interface FeatureState extends fromApp.AppState{
  tickets: State
}

export interface State {
  tickets: Ticket[];
}

const initialState: State = {
  tickets: [
    // new Ticket(
    //   new Date(),
    //   'Tasty Schnitzel',
    //   'A su just awesome!',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'עדיין לא טופל'
    //   ),
  ]
};

export function ticketReducer(state = initialState, action: TicketActions.TicketActions) {
  switch(action.type) {
    case (TicketActions.SET_TICKET):
      const resObj = {
        ...state,
        tickets: [...state.tickets, action.payload]
      };
      console.log(state.tickets);
      console.log(action.payload);
      console.log(resObj);
      return resObj;
    case (TicketActions.SET_TICKETS):
      return {
        ...state,
        tickets: [...action.payload]
      };
    // case (RecipeActions.ADD_RECIPE):
    //   return {
    //     ...state,
    //     recipes: [...state.recipes, action.payload]
    //   };
    // case (RecipeActions.UPDATE_RECIPE):
    //   const recipe = state.recipes[action.payload.index];
    //   const updatedRecipe = {
    //     ...recipe,
    //     ...action.payload.updatedRecipe
    //   };
    //   const recipes = [...state.recipes];
    //   recipes[action.payload.index] = updatedRecipe;
    //   return {
    //     ...state,
    //     recipes: recipes
    //   };
    case (TicketActions.DELETE_TICKET):
      const oldTickets = [...state.tickets];
      // oldTickets.splice(action.payload,1);
      console.log('deleted with redux!');
      return {
        ...state,
        tickets: oldTickets
      };
    default:
      return state;
  }
}
