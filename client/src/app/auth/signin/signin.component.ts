import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Store} from '@ngrx/store';
import * as AuthActions from './../../auth/store/auth.actions'
import {All, LogIn} from "../store/auth.actions";
import {User} from "../../models/user";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<All>
  ) {
    this.getState = this.store.select('auth');
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.LogIn({email: email, password: password}));
  }

}
