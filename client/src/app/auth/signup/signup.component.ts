import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as AuthActions from './../../auth/store/auth.actions'
import {All} from "../store/auth.actions";
import {Observable} from "rxjs/index";
import * as OrganisationsActions from "../../organisations/store/organisation.actions";
import {CurrentUserService} from "../../shared/current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  roles;
  @ViewChild('f') signupForm: NgForm;
  organisations;
  user;
  getState: Observable<any>;
  errorMessage: string | null;
  orgSubscription;
  stateSubscription;
  currentUser;
  newUserForm: FormGroup;


  constructor(
    private store: Store<All>,
    private currentUserService: CurrentUserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.getState = this.store.select('auth');
    this.currentUser = this.currentUserService.currentUser
  }

  ngOnInit() {
    if(this.currentUserService.currentUser.userRole === 'super') {
      this.roles = AppConstants.USER_ROLES.SUPER_ROLES;
      this.newUserForm = new FormGroup({
        'userData' : new FormGroup({
          'email' : new FormControl(null, [Validators.required, Validators.email]),
          'password' : new FormControl(null, [Validators.required]),
          'confirmPassword' : new FormControl(null, [Validators.required]),
          'fullName' : new FormControl(null, [Validators.required]),
          'phoneNumber' : new FormControl(null, [Validators.required]),
          'orgId' : new FormControl(null, [Validators.required]),
          'userRole' : new FormControl(null, [Validators.required]),
        }),
        // 'status': new FormControl('Stable')
      })
    } else if(this.currentUserService.currentUser.userRole === 'admin') {
      this.roles = AppConstants.USER_ROLES.ADMIN_ROLES;

      this.newUserForm = new FormGroup({
        'userData' : new FormGroup({
          'email' : new FormControl(null, [Validators.required, Validators.email]),
          'password' : new FormControl(null, [Validators.required]),
          'confirmPassword' : new FormControl(null, [Validators.required]),
          'fullName' : new FormControl(null, [Validators.required]),
          'phoneNumber' : new FormControl(null, [Validators.required]),
          'userRole' : new FormControl(null, [Validators.required]),
        }),
        // 'status': new FormControl('Stable')
      })
    }
    this.stateSubscription = this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new OrganisationsActions.FetchOrganisations())

    this.orgSubscription = this.store.select('organisations').subscribe((result) => {
      this.organisations = result.organisations.length;
      result.organisations.map((value: any) => {
        value.editMode = false;
      });
      this.organisations = result.organisations;
    });
  }

  onSubmit() {
    const userData = this.newUserForm.value.userData;
    this.store.dispatch(new AuthActions.SignUp({userObject: userData}))
    // this.router.navigate(['../'], {relativeTo: this.route});
    // this.toastr.success('הכרטיס נרשם בהצלחה','כרטיס חדש')
  }

  fill() {
    console.log("newUserForm ", this.newUserForm)
    this.newUserForm.patchValue({
      userData: {
        email: 'taltal115@gmail.com',
        password: '1q2w3e4r',
        confirmPassword: '1q2w3e4r',
        fullName: 'tal shitrit',
        phoneNumber: '0547392228',
        organisation: 'organisation',
        userRole: 'teacher'
      }
    })
  }

  ngOnDestroy() {
    this.orgSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
