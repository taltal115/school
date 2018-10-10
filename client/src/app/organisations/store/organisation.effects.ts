import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, map, catchError} from 'rxjs/operators';
import * as fromOrganisation from './organisation.reducers';
import * as AuthActions from './../../auth/store/auth.actions'
import {Store} from '@ngrx/store';
import * as OrganisationActions from './organisation.actions';
import {OrganisationsService} from "../organisations.service";
import {take} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {of} from "rxjs/index";

@Injectable()
export class OrganisationEffects {

  user: any;

  @Effect()
  organisationFetch = this.actions$
    .ofType(OrganisationActions.FETCH_ORGANISATIONS)
    .pipe(
      take(1),
      switchMap((action: OrganisationActions.FetchOrganisations) => {
        console.log('FETCH_ORGANISATIONS: ',action);
        return this.organisationsService.getOrganisations()
          .pipe(
            map((organisations) => {
              console.log("organisationorganisation: ", organisations);
              return {
                type: OrganisationActions.SET_ORGANISATIONS,
                payload: organisations
              };
              // return new SignUpSuccess({token: user.token, email: payload.email});
            }),
            catchError((error: any) => {
              console.log(error);
              this.router.navigate(['/login']);
              localStorage.removeItem('user');
              return of({
                type: AuthActions.LogOut
              })
            })
          );
      })
    );


  @Effect()
  organisationStore = this.actions$
    .ofType(OrganisationActions.SET_ORGANISATION)
    .pipe(switchMap((action: OrganisationActions.SetOrganisation) => {
      return this.organisationsService.createOrganisation(action.payload)
        .pipe(
          map((organisations) => {
            console.log("organisationsorganisations: ", organisations);
            return {
              type: OrganisationActions.FETCH_ORGANISATIONS
            };
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login'])
            localStorage.removeItem('user')
            return error;
          })
        );
    }));

  @Effect({dispatch: false})
  organisationDelete = this.actions$
    .ofType(OrganisationActions.DELETE_ORGANISATION)
    .pipe(switchMap((action: OrganisationActions.DeleteRow) => {
      return this.organisationsService.deleteOrganisation(action.payload.organisation)
        .pipe(
          map((organisations) => {
            console.log("organisationsorganisations: ", organisations);
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            return (error);
          })
        );
    }));

  @Effect()
  updateOrganisationStore = this.actions$
    .ofType(OrganisationActions.UPDATE_ORGANISATION)
    .pipe(switchMap((action: OrganisationActions.UpdateOrganisation) => {
      return this.organisationsService.updateOrganisation(action.payload.organisation)
        .pipe(
          map((organisations) => {
            console.log("OrganisationOrganisation: ", organisations);
            return {
              type: OrganisationActions.FETCH_ORGANISATIONS
            };
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login'])
            localStorage.removeItem('user')
            return error;
          })
        );
    }));

  constructor(
    private actions$: Actions,
    private store: Store<fromOrganisation.FeatureState>,
    private organisationsService: OrganisationsService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
