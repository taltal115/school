import {HttpClient, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  private BASE_URL = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  getOrganisationCount(): Observable<any> {
    const url = `${this.BASE_URL}/organisations`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getUsersCount() {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getTicketsCount() {
    const url = `${this.BASE_URL}/tickets`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
