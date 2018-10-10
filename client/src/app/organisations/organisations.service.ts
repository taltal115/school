import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Organisation} from "./organisation.model";
import {AppConstants} from "../app.constants";

@Injectable()
export class OrganisationsService{
  private BASE_URL = AppConstants.CONFIG.BASE_URL;

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
      this.BASE_URL+'/organisations',
      organisation,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  createOrganisation(organisation: Organisation) {
    const req = new HttpRequest(
      'POST',
      this.BASE_URL+'/organisations',
      organisation,
      {reportProgress: true}
    );
    return this.http.request(req);
  }

  getOrganisation(id: string): Observable<Organisation> {
    console.log("id: ",id)
    const url = `${this.BASE_URL}/organisations/${id}`;
    return this.http.get<Organisation>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  updateOrganisation(organisation: Organisation) {
    const req = new HttpRequest(
      'PATCH',
      this.BASE_URL+'/organisations',
      organisation,
      {reportProgress: true}
    );
    return this.http.request(req);
  }
}
