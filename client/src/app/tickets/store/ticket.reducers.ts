import {Ticket} from '../ticket.model';
import * as TicketActions from './ticket.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
  tickets: State
}

export interface State {
  tickets: Ticket[];
}

const initialState: State = {
  tickets: []
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
    case (TicketActions.UPDATE_TICKET):
      const recipe = state.tickets[action.payload.index];
      const updatedTickets = {
        ...recipe,
        ...action.payload.ticket
      };
      const tickets = [...state.tickets];
      tickets[action.payload.index] = updatedTickets;
      return {
        ...state,
        tickets: tickets
      };
    case (TicketActions.DELETE_TICKET):
      const oldTickets = [...state.tickets];
      oldTickets.splice(action.payload.index,1);
      console.log('deleted with redux!');
      return {
        ...state,
        tickets: oldTickets
      };
    default:
      return state;
  }
}
