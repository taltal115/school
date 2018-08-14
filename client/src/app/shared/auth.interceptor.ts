import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable} from "rxjs";
import { Store} from '@ngrx/store';
import {take, switchMap} from 'rxjs/operators'

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("intercept! ",req);
    return this.store.select('auth')
      .pipe(take(1),
       switchMap((authState: fromAuth.State) => {
        console.log("authState: ",authState);
         // this.authService = this.injector.get(AuthService);
         if(authState && authState.user && authState.user.token) {
           request = request.clone({
             setHeaders: {
               'Authorization': `Bearer ${authState.user.token}`,
               'Content-Type': 'application/json'
             }
           });
         }

        // const copiedReq = req.clone({params: req.params.set('auth', authState.token)})
        // return next.handle(copiedReq);
        return next.handle(request);
      }));

  }
}


//
//
// import { Injectable, Injector } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
//   HttpResponse, HttpErrorResponse
// } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { Router } from '@angular/router';
//
// import { AuthService } from './auth.service';
// import {catchError} from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
//
// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   private authService: AuthService;
//   constructor(private injector: Injector) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.authService = this.injector.get(AuthService);
//     const token: string = this.authService.getToken();
//     request = request.clone({
//       setHeaders: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     return next.handle(request);
//   }
// }
//
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//     return next.handle(request).pipe(
//       catchError((response: any) => {
//         if (response instanceof HttpErrorResponse && response.status === 401) {
//           localStorage.removeItem('token');
//           this.router.navigateByUrl('/log-in');
//           console.log(response);
//         }
//         return Observable.throw(response);
//       }));
//   }
// }
