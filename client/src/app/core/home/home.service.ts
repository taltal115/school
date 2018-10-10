import {HttpClient, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AppConstants} from "../../app.constants";

@Injectable()
export class HomeService {
  private BASE_URL = AppConstants.CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  getOrganisationCount(): Observable<any> {
    const url = `${this.BASE_URL}/dashboard/organisations`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getUsersCount() {
    const url = `${this.BASE_URL}/dashboard/users`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getTicketsCount() {
    const url = `${this.BASE_URL}/dashboard/tickets`;
    return this.http.get<number>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
