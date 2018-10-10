import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AuthService } from '../auth.service';
import {
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  GetStatus
} from './auth.actions';
import {ToastrService} from "ngx-toastr";
import * as AuthActionTypes from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService
) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      this.spinnerService.show();
      return this.authService.logIn(payload.email, payload.password)
        .pipe(
          map((data) => {
            this.spinnerService.hide();
            console.log(data);
            return new LogInSuccess({
              id: data.data._id,
              token: data.session.token,
              email: data.session.user.email,
              fullName: data.session.user.fullName,
              phoneNumber: data.session.user.phoneNumber,
              userRole: data.session.user.userRole,
              orgId: data.session.user.orgId
            });
          }),
          catchError(() => {
            this.spinnerService.hide();
            console.log("error");
            return of(new LogInFailure({ error: "error" }));
          })
        )
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', JSON.stringify(user.payload));
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      console.log("payloadpayload: ", payload);
      return this.authService.signUp(payload.userObject)
        .pipe(
          map((user) => {
            console.log("useruser: ", user);
            // return new SignUpSuccess({token: user.token, email: payload.email});
            // console.log(data);
            return new SignUpSuccess({
              id: user.data._id,
              token: user.data.token,
              email: user.data.email,
              fullName: user.data.fullName,
              phoneNumber: user.data.phoneNumber,
              userRole: user.data.userRole,
              orgId: user.data.orgId
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(new SignUpFailure({ error: error }));
          })
        );
    }));

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      // localStorage.setItem('user', JSON.stringify(user.payload));
      this.router.navigate(['/users']);
      // return {
      //   type: UsersActions.FETCH_USERS
      // };
    })
  );

  @Effect({ dispatch: false })
  SigninFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.toastr.error('שגיאה בהיתחברות!', 'נסו שוב');
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    })
  );

  @Effect({ dispatch: false })
  SignupFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/signup']);
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('user');
      console.log('logout');
      this.router.navigate(['/signin']);
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    map((action: GetStatus) => action),
    switchMap(payload => {
      return this.authService.getStatus();
    }));
}
