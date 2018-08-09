import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  signUp(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`;
    return this.http.post<any>(url, {email, password});
  }

  getUsers(): Observable<any> {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<any>(url);
  }
}
