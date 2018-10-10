import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import { Observable} from "rxjs";
import { Store} from '@ngrx/store';
import {take, switchMap, tap} from 'rxjs/operators'
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import * as AuthActions from "../auth/store/auth.actions";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .pipe(take(1),
       switchMap((authState: fromAuth.State) => {
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
        return next.handle(request) .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {

              console.log(" all looks good");
              // http response status code
              console.log(event.status);
            }
          }, error => {
            // http response status code
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.message);
            console.log("--- end of response---");
            this.store.dispatch(new AuthActions.LogOut);
            this.router.navigate(['/signin'])
          })
        )
      }));

  }
}
