import {HttpClient, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../models/user";
import {Ticket} from "../tickets/ticket.model";

import {AppConstants} from "../app.constants";
// import { User } from '../models/user';


@Injectable()
export class UsersService {
  private BASE_URL = AppConstants.CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<User[]>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  deleteUser(user: User) {
    const req = new HttpRequest(
      'DELETE',
      this.BASE_URL+'/users',
      user,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  getUser(id: string): Observable<User> {
    console.log("id: ",id)
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<User>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  updateUser(user: User) {
    const req = new HttpRequest(
      'PATCH',
      this.BASE_URL+'/users',
      user,
      {reportProgress: true}
    );
    return this.http.request(req);
  }
}
