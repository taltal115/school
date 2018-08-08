import {Action} from '@ngrx/store'
import {Ticket} from '../ticket.model';

export const SET_TICKET = 'SET_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';

export class SetTicket implements Action {
  readonly type = SET_TICKET;

  constructor(public payload: Ticket) {}
}

export class DeleteRow implements Action {
  readonly type = DELETE_TICKET;

  constructor(public payload: Ticket) {}
}

export type TicketActions = SetTicket | DeleteRow;
