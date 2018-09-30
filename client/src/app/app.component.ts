import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducers'
import * as AuthActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private store: Store<fromApp.AppState>) {}
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAb-SE6fRgdoroTH4tuNwB6SigUA8pYFvo",
    //   authDomain: "ng-recipe-book-f859e.firebaseio.com"
    // });
    if(localStorage.getItem('user')) {
      const accessToken = JSON.parse(localStorage.getItem('user'));
      this.store.dispatch(new AuthActions.SetToken(accessToken));
      console.log(`%c 
user: ${(accessToken).id}
email: ${(accessToken).email}`,'background: red;font-size: 16px;'
      );
    } else {
      this.store.dispatch(new AuthActions.LogOut());
    }
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
