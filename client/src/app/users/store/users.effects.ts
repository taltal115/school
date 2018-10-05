import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, map, catchError, take} from 'rxjs/operators';

// import * as RecipeActions from '../store/recipe.actions';
import * as fromUser from './users.reducers';
import {Store} from '@ngrx/store';
import {Observable, of} from "rxjs";
import * as AuthActionTypes from "../../auth/store/auth.actions";
import {UsersService} from "../users.service";
import * as UsersActions from "../../users/store/users.actions";
import * as TicketActions from "../../tickets/store/ticket.actions";
import {Router} from "@angular/router";
import {FetchUsers} from "../../auth/store/auth.actions";
// import {Ticket} from "../ticket.model";

@Injectable()
export class UsersEffects {
  @Effect()
  FetchUsers: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.FETCH_USERS),
    take(1),
    switchMap(() => {
      return this.userService.getUsers()
        .pipe(
          map((users) => {
            users = users.map(user => user)
            return {
              type: UsersActions.SET_USERS,
              payload: users
            };
            // return new SignUpSuccess({token: user.token, email: payload.email});
          }),
          catchError((error) => {
            console.log(error);
            return of(error);
            // return of(new SignUpFailure({ error: error }));
          })
        );
    }));

  @Effect()
  userDelete = this.actions$
    .ofType(UsersActions.DELETE_USER)
    .pipe(switchMap((action: UsersActions.DeleteUser) => {
      return this.userService.deleteUser(action.payload.user)
        .pipe(
          map((users) => {
            console.log("ryuuuuuuu: ", users);
            return new FetchUsers();
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            return (error);
          })
        );
    }));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<fromUser.FeatureState>,
    private userService: UsersService
  ) {}
}
