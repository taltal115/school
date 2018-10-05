import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Ticket} from '../../ticket.model';
import {Store} from '@ngrx/store';
// import {Observable} from "rxjs/Rx";

import * as fromTicket from '../../store/ticket.reducers';
import * as TicketActions from '../../store/ticket.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {CurrentUserService} from "../../../shared/current-user.service";

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  statuses = ['Stable', 'Critical', 'Finished'];
  newTicketForm: FormGroup;
  excludeProjectName = ['test'];
  user: any;

  constructor(
    private store: Store<fromTicket.FeatureState>,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private currentUserService: CurrentUserService
  ) {
    this.user = this.currentUserService.currentUser;
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

    this.newTicketForm = new FormGroup({
      'ticketData' : new FormGroup({
        'damagedDevice' : new FormControl(null, []),
        'serialNumber' : new FormControl(null, []),
        'structure' : new FormControl(null, []),
        'deviceLocation' : new FormControl(null, []),
        'problemsNature' : new FormControl(null, [Validators.required]),
        'missingEquipments' : new FormControl(null, []),
      }),
      // 'status': new FormControl('Stable')
    })
  }

  onSubmit() {
    const ticketData = this.newTicketForm.value.ticketData;
    this.store.dispatch(new TicketActions.SetTicket(new Ticket(
      new Date(),
      this.user.fullName,
      ticketData.damagedDevice,
      ticketData.serialNumber,
      ticketData.structure,
      ticketData.deviceLocation,
      ticketData.problemsNature,
      ticketData.missingEquipments,
      this.user.phoneNumber,
      'waiting_for_approval',
      this.user.id
    )));
    this.router.navigate(['../'], {relativeTo: this.route});
    console.log(this.newTicketForm)
    this.toastr.success('הכרטיס נרשם בהצלחה','כרטיס חדש')
  }

  allowedEmails(control: FormControl): {[s: string]: boolean} {
    if(this.excludeProjectName.indexOf(control.value) !== -1) {
      return {'excludeProjectName': true}
    } else {
      return null;
    }
  }

  fillForm() {
    console.log("newTicketForm ", this.newTicketForm)
    this.newTicketForm.patchValue({
      ticketData: {
        teacherName: 'nulfdsl',
        damagedDevice: 'nullfdsa',
        serialNumber: 'fdsanull',
        structure: 'fdsanull',
        deviceLocation: 'fdsnull',
        problemsNature: 'fdsa',
        teachersContactPhone: 'fdsds',
        missingEquipments: 'fdsafds'
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
