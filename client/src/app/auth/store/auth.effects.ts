import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {Router} from '@angular/router';
import {tap, map, switchMap, mergeMap, catchError} from 'rxjs/operators'
import * as AuthActions from './auth.actions'
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as RecipeActions from "../../recipes/store/recipe.actions";
import {AuthService} from "../auth.service";
import {of} from "rxjs";
import {FetchUsers} from "./auth.actions";

@Injectable()
export class AuthEffects {
  // @Effect() authSignup = this.actions$
  //   .ofType(AuthActions.TRY_SIGNUP)
  //   .pipe(map((action: AuthActions.TrySignup) => {
  //     return action.payload
  //   }),
  //   switchMap((authData: {username: string, password: string}) =>{
  //     return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
  //   }),
  //   switchMap(() =>{
  //     return from(firebase.auth().currentUser.getIdToken())
  //   }),
  //   /** to dispatch multiple actions */
  //   mergeMap((token: string) => {
  //     this.router.navigate(['/']);
  //     return [
  //       {
  //         type: AuthActions.SIGNIN
  //       },
  //       {
  //         type: AuthActions.SET_TOKEN,
  //         payload: token
  //       }
  //     ]
  //   }));

  @Effect() authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload
    }),
    switchMap((authData: any) => {
      console.log("authData: ",authData);
      const req = new HttpRequest(
        'POST',
        'http://localhost:3000/auth/register',
        authData.userObject,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    }),
      map((res) =>{
        console.log(res);
        this.router.navigate(['/']);
        return {
          type: AuthActions.SIGNUP
        }
      }));

  // @Effect() authSignin = this.actions$
  //   .ofType(AuthActions.TRY_SIGNIN)
  //   .pipe(map((action: AuthActions.TrySignin) => {
  //     return action.payload
  //   }),
  //   switchMap((authData: {username: string, password: string}) =>{
  //     return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
  //   }),
  //   switchMap(() =>{
  //     return from(firebase.auth().currentUser.getIdToken())
  //   }),
  //   /** to dispatch multiple actions */
  //   mergeMap((token: string) => {
  //     this.router.navigate(['/']);
  //     return [
  //       {
  //         type: AuthActions.SIGNIN
  //       },
  //       {
  //         type: AuthActions.SET_TOKEN,
  //         payload: token
  //       }
  //     ]
  //   }));

  // @Effect()
  // LogIn: Observable<any> = this.actions$
  //   .ofType(AuthActionTypes.LOGIN)
  //   .pipe(map((action: LogIn) => action.payload),
  //   switchMap(payload => {
  //     return this.authService.logIn(payload.email, payload.password)
  //       .map((user) => {
  //         console.log(user);
  //         return new LogInSuccess({token: user.token, email: payload.email});
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         return Observable.of(new LogInFailure({ error: error }));
  //       });
  //   }));

  @Effect() authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
      map((action: AuthActions.TrySignin) => action.payload),
      switchMap((authData: any)=> {

        return this.authService.logIn(authData.email, authData.password)
          .pipe(
            map((user) => {
            console.log(user);
            // return new LogInSuccess({token: user.token, email: authData.email});
            return {
              type: AuthActions.SIGNIN
            }
          })
            ,
          catchError( (error) => {
            console.log(error);
            return of({ error: error });
          })
          );



        // console.log("authData: ",authData);
        // const req = new HttpRequest(
        //   'POST',
        //   'http://localhost:3000/auth/login',
        //   authData,
        //   {reportProgress: true}
        // );
        // return this.httpClient.request(req)
      }),
      map((res) =>{
        console.log(res);
        localStorage.setItem('currentUser', 'tal');
        this.router.navigate(['/']);
        return {
          type: AuthActions.SIGNIN
        }
      }));


  @Effect({dispatch: false}) authSignout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(tap(() => {
      console.log('here');
      this.router.navigate(['/signin']);
    })
    );


  @Effect({dispatch: false}) fetchUsers = this.actions$
    .ofType(AuthActions.FETCH_USERS)
    .pipe(switchMap((authData: any)=> {

      return this.authService.getUsers()
        .pipe(
          map((user) => {
            console.log("user: ",user);
            // return new LogInSuccess({token: user.token, email: authData.email});
            return {
              type: AuthActions.SIGNIN
            }
          })
          ,
          catchError( (error) => {
            console.log(error);
            return of({ error: error });
          })
        )}
    ));


      constructor(
    private actions$: Actions,
    private router:Router,
    private authService: AuthService,
    private httpClient: HttpClient) {}
}
