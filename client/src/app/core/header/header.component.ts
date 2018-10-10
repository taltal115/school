import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers'
import * as AuthActions from '../../auth/store/auth.actions'
import * as TicketActions from "../../tickets/store/ticket.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  getState: Observable<any>;
  getUser: Observable<any>;
  user: User;
  private getStateSubscription: any;

  // authState: Observable<fromAuth.State>;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getState = this.store.select('auth'); //this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getStateSubscription = this.getState.subscribe((state) => {
      console.log("state: ", state);
      this.isAuthenticated = state.isAuthenticated;
      if(this.isAuthenticated) {
        this.user = state.user;
      }
    });
  }

  onSaveData() {
    // this.store.dispatch(new RecipeActions.StoreRecipes())
  }

  onFetchData() {
    // this.store.dispatch(new RecipeActions.FetchRecipes());
    this.store.dispatch(new TicketActions.FetchTickets)
  }

  onFetchUsers() {
    // this.store.dispatch(new RecipeActions.FetchRecipes());
    // this.store.dispatch(new AuthActions.FetchUsers)
    this.router.navigate(['/users'], {relativeTo: this.route})
  }

  onLogout() {
    location.reload();
    this.store.dispatch(new AuthActions.LogOut);
  }

  ngOnDestroy() {
    this.getStateSubscription.unsubscribe()
  }
}
