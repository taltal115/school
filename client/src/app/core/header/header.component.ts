import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers'
// import * as fromAuth from '../../auth/store/auth.reducers'
import * as AuthActions from '../../auth/store/auth.actions'
import * as TicketActions from "../../tickets/store/ticket.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  getState: Observable<any>;
  // authState: Observable<fromAuth.State>;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    this.getState = this.store.select('auth'); //this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      console.log("state: ", state)
      this.isAuthenticated = state.isAuthenticated;
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
    this.store.dispatch(new AuthActions.FetchUsers)
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogOut);
  }
}
