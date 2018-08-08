import {Action} from '@ngrx/store'
import {Ticket} from '../ticket.model';

export const SET_TICKET = 'SET_TICKET';
export const SET_TICKETS = 'SET_TICKETS';
export const DELETE_TICKET = 'DELETE_TICKET';
export const FETCH_TICKETS = 'FETCH_TICKETS';

export class SetTicket implements Action {
  readonly type = SET_TICKET;

  constructor(public payload: Ticket) {}
}

export class SetTickets implements Action {
  readonly type = SET_TICKETS;

  constructor(public payload: Ticket[]) {}
}

export class DeleteRow implements Action {
  readonly type = DELETE_TICKET;

  constructor(public payload: Ticket) {}
}

export class FetchTickets implements Action {
  readonly type = FETCH_TICKETS;
}

export type TicketActions = SetTicket | SetTickets | DeleteRow | FetchTickets;
