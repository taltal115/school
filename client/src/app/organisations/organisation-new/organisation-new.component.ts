import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
// import {Ticket} from '../../ticket.model';
import {Store} from '@ngrx/store';
// import {Observable} from "rxjs/Rx";

import * as fromOrganisation from '../store/organisation.reducers';
import * as OrganisationActions from '../store/organisation.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Organisation} from "../organisation.model";

@Component({
  selector: 'app-organisation-new',
  templateUrl: './organisation-new.component.html',
  styleUrls: ['./organisation-new.component.css']
})
export class OrganisationNewComponent implements OnInit {
  types = ['regular-school',
    'yeshiva',
    'ulpana'];
  newOrganisationForm: FormGroup;
  excludeProjectName = ['test'];
  user: any;
  textValue: string;

  constructor(
    private store: Store<fromOrganisation.FeatureState>,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit() {
    // this.projectForm = new FormGroup({
    //   'ticketData' : new FormGroup({
    //     'projectName' : new FormControl(
    //       null,
    //       [],//this.allowedEmails.bind(this),
    //       this.allowedEmailsAsync),
    //     'email' : new FormControl(null, [Validators.required, Validators.email])
    //   }),
    //   'status': new FormControl('Stable')
    // });

    this.newOrganisationForm = new FormGroup({
      'orgData' : new FormGroup({
        'name' : new FormControl(null, [Validators.required]),//,this.allowedEmailsAsync),
        'address' : new FormControl(null, [Validators.required]),
        'city' : new FormControl(null, [Validators.required]),
        'phone' : new FormControl(null, [Validators.required]),
        'status' : new FormControl(null, []),
        'type' : new FormControl(null, )
      }),
      // 'status': new FormControl('Stable')
    })
  }

  onSubmit() {
    const orgData = this.newOrganisationForm.value.orgData;
    console.log(orgData)
    this.store.dispatch(new OrganisationActions.SetOrganisation(new Organisation(
      orgData.name,
      orgData.address,
      orgData.city,
      orgData.phone,
      orgData.type,
      false
    )));
    this.router.navigate(['../'], {relativeTo: this.route});
    console.log(this.newOrganisationForm)
    this.toastr.success('הארגון נרשם בהצלחה','ארגון חדש')
  }

  allowedEmails(control: FormControl): {[s: string]: boolean} {
    if(this.excludeProjectName.indexOf(control.value) !== -1) {
      return {'excludeProjectName': true}
    } else {
      return null;
    }
  }

  fillForm() {
    console.log("newTicketForm ", this.newOrganisationForm)
    this.newOrganisationForm.patchValue({
      orgData: {
        name: 'nulfdsl',
        address: 'nullfdsa',
        city: 'fdsanull',
        phone: 'fdsanull',
        status: 'fdsnull',
        type: this.types[0],
      }
    })
  }

  // allowedEmailsAsync(control: FormControl): Promise<any> | Observable<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if(control.value === 'test') {
  //         resolve({'excludeProjectName': true})
  //       } else {
  //         resolve(null);
  //       }
  //     },2000)
  //   })
  // }
}
