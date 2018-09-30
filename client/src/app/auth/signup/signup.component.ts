import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromApp from './../../store/app.reducers'
import * as AuthActions from './../../auth/store/auth.actions'
import {All, SignUp} from "../store/auth.actions";
import {Observable} from "rxjs/index";
import {User} from "../../models/user";
import * as OrganisationsActions from "../../organisations/store/organisation.actions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  roles = [
    'super',
    'admin',
    'teacher',
    'student'
  ];
  @ViewChild('f') signupForm: NgForm;
  organisations;
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  orgSubscription;
  stateSubscription;

  constructor(
    private store: Store<All>
  ) {
    this.getState = this.store.select('auth');
  }

  ngOnInit() {
    this.stateSubscription = this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new OrganisationsActions.FetchOrganisations())

    this.orgSubscription = this.store.select('organisations').subscribe((result) => {
      console.log("organisations : ",result)
      this.organisations = result.organisations.length;
      result.organisations.map((value: any) => {
        value.editMode = false;
      });
      this.organisations = result.organisations;
    });
  }
  onSignup(form: NgForm) {
    console.log(form.value);
    this.store.dispatch(new AuthActions.SignUp({userObject: form.value}));
  }

  fill(f: NgForm) {
    console.log(f);
    this.signupForm.setValue({
      email: 'taltal115@gmail.com',
      password: '1q2w3e4r',
      confirmPassword: '1q2w3e4r',
      fullName: 'tal shitrit',
      phoneNumber: '0547392228',
      userRole: 'super'
    })
  }

  ngOnDestroy() {
    this.orgSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
