import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError} from "rxjs/operators";

// import { User } from '../models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/auth/login`;
    return this.http.post<any>(url, {email, password});
  }

  signUp(userData: any): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`;
    return this.http.post<any>(url, userData);
  }

  // getUsers(): Observable<any> {
  getUsers() {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<any>(url);
  }

  // getToken(): string {
  //   let user = localStorage.getItem('user');
  //   console.log("user: ",user);
  //   if (user) {
  //     return JSON.parse(user).token;
  //   }
  // }
  //
  // logIn(email: string, password: string): Observable<any> {
  //   const url = `${this.BASE_URL}/login`;
  //   return this.http.post<User>(url, {email, password});
  // }
  //
  // signUp(email: string, password: string): Observable<User> {
  //   const url = `${this.BASE_URL}/register`;
  //   return this.http.post<User>(url, {email, password});
  // }

  getStatus(): Observable<any> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<any>(url);
  }
}
