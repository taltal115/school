import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {Ticket} from "./ticket.model";
import {Store} from "@ngrx/store";
import {All} from "../auth/store/auth.actions";
// import {User} from "../models/user";

// import { User } from '../models/user';


@Injectable()
export class TicketsService{
  private BASE_URL = 'http://localhost:3000';

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
      'http://localhost:3000/tickets',
      ticket,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  createTicket(ticket: Ticket) {
    const req = new HttpRequest(
      'POST',
      'http://localhost:3000/tickets',
      ticket,
      {reportProgress: true}
    );
    return this.http.request(req);
  }
}
