import {Organisation} from '../organisation.model';
import * as OrganisationActions from './organisation.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
  organisations: State
}

export interface State {
  organisations: Organisation[];
}

const initialState: State = {
  organisations: [
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

export function organisationReducer(state = initialState, action: OrganisationActions.All) {
  switch(action.type) {
    case (OrganisationActions.SET_ORGANISATION):
      const resObj = {
        ...state,
        organisations: [...state.organisations, action.payload]
      };
      // console.log(state.tickets);
      // console.log(action.payload);
      // console.log(resObj);
      return resObj;
    case (OrganisationActions.SET_ORGANISATIONS):
      return {
        ...state,
        organisations: [...action.payload]
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
