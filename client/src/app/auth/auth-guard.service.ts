// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import {Store} from '@ngrx/store';
// import {Injectable} from '@angular/core';
import {take, map} from 'rxjs/operators';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//
//   constructor(private store: Store<fromApp.AppState>) {}
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.store.select('auth')
//       /** take one action from this type */
//       .pipe(take(1),
//         map((authState: fromAuth.State) => {
//           debugger
//           return authState.isAuthenticated
//       }));
//   }
// }


import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, CanActivateChild
} from "@angular/router";
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    public router: Router,
    public authService: AuthService,
    public store: Store<fromApp.AppState>
  ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.store.select('auth')
  //   /** take one action from this type */
  //     .pipe(take(1),
  //       map((authState: fromAuth.State) => {
  //         debugger
  //         return authState.isAuthenticated
  //       }));
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('11111111111111111111111111111')

    return this.store.select('auth')
    /** take one action from this type */
      .pipe(map((authState: fromAuth.State) => {
          console.log('2222222222222222222222222222222222222222222222222222222222222')
          console.log('xxx-> ',authState);
          if(authState.isAuthenticated) {
            console.log('true -> ',authState);
            return true;
          } else {
            console.log('false -> ',authState);
            this.router.navigate(['/']);
            return false
          }
        }));
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
