import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromApp from './../../store/app.reducers'
import * as AuthActions from './../../auth/store/auth.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  roles = [
    'super',
    'admin',
    'teacher',
    'student'
  ];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    this.store.dispatch(new AuthActions.TrySignup({userObject: form.value}));
  }

}
