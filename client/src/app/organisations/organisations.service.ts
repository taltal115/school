import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Organisation} from "./organisation.model";

@Injectable()
export class OrganisationsService{
  private BASE_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  getOrganisations(): Observable<any> {
    const url = `${this.BASE_URL}/organisations`;
    return this.http.get<any[]>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  deleteOrganisation(organisation: Organisation) {
    const req = new HttpRequest(
      'DELETE',
      'http://localhost:3000/organisations',
      organisation,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  createOrganisation(organisation: Organisation) {
    const req = new HttpRequest(
      'POST',
      'http://localhost:3000/organisations',
      organisation,
      {reportProgress: true}
    );
    return this.http.request(req);
  }
}
