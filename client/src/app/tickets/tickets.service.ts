import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {Ticket} from "./ticket.model";
import {Store} from "@ngrx/store";
import {All} from "../auth/store/auth.actions";
// import {User} from "../models/user";
import {AppConstants} from "../app.constants";
// import { User } from '../models/user';


@Injectable()
export class TicketsService{
  private BASE_URL = AppConstants.CONFIG.BASE_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getTickets(): Observable<Ticket[]> {
    const url = `${this.BASE_URL}/tickets`;
    return this.http.get<Ticket[]>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getTicket(id: string): Observable<Ticket> {
    console.log("id: ",id)
    const url = `${this.BASE_URL}/tickets/${id}`;
    return this.http.get<Ticket>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  deleteTicket(ticket: Ticket) {
    const req = new HttpRequest(
      'DELETE',
      this.BASE_URL+'/tickets',
      ticket,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  createTicket(ticket: Ticket) {
    const req = new HttpRequest(
      'POST',
      this.BASE_URL+'/tickets',
      ticket,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  updateTicket(ticket: Ticket) {
    const req = new HttpRequest(
      'PATCH',
      this.BASE_URL+'/tickets',
      ticket,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  exportToCsv(tickets: Ticket[]) {
    const req = new HttpRequest(
      'POST',
      this.BASE_URL+'/tickets/export/csv',
      JSON.stringify(tickets),
      {reportProgress: true}
    );
    return this.http.request(req);
  }
}
