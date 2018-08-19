import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../models/user";

// import { User } from '../models/user';


@Injectable()
export class UsersService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
  // getUsers() {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<User[]>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

}
