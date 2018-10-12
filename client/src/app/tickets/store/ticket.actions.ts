import {Action} from '@ngrx/store'
import {Ticket} from '../ticket.model';

export const SET_TICKET = 'SET_TICKET';
export const SET_TICKETS = 'SET_TICKETS';
export const DELETE_TICKET = 'DELETE_TICKET';
export const FETCH_TICKETS = 'FETCH_TICKETS';
export const FETCH_TICKET = 'FETCH_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';

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

  constructor(public payload: {index: number, ticket: Ticket}) {}
}

export class FetchTickets implements Action {
  readonly type = FETCH_TICKETS;
}

export class FetchTicket implements Action {
  readonly type = FETCH_TICKET;

  constructor(public payload: string) {}
}

export class UpdateTicket implements Action {
  readonly type = UPDATE_TICKET;

  constructor(public payload: {indexId: string, ticket: Ticket}) {}
}


export type TicketActions =
  SetTicket |
  SetTickets |
  DeleteRow |
  FetchTickets |
  FetchTicket |
  UpdateTicket;
