import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Ticket} from '../../ticket.model';
import {Store} from '@ngrx/store';
// import {Observable} from "rxjs/Rx";

import * as fromTicket from '../../store/ticket.reducers';
import * as TicketActions from '../../store/ticket.actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  statuses = ['Stable', 'Critical', 'Finished'];
  newTicketForm: FormGroup;
  excludeProjectName = ['test'];

  constructor(
    private store: Store<fromTicket.FeatureState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
        'teacherName' : new FormControl(null, [Validators.required]),//,this.allowedEmailsAsync),
        'damagedDevice' : new FormControl(null, []),
        'serialNumber' : new FormControl(null, []),
        'structure' : new FormControl(null, []),
        'deviceLocation' : new FormControl(null, []),
        'problemsNature' : new FormControl(null, []),
        'missingEquipments' : new FormControl(null, []),
        'teachersContactPhone' : new FormControl(null, [])
      }),
      // 'status': new FormControl('Stable')
    })
  }

  onSubmit() {
    const ticketData = this.newTicketForm.value.ticketData;
    this.store.dispatch(new TicketActions.SetTicket(new Ticket(
      new Date(),
      ticketData.teacherName,
      ticketData.damagedDevice,
      ticketData.serialNumber,
      ticketData.structure,
      ticketData.deviceLocation,
      ticketData.problemsNature,
      ticketData.missingEquipments,
      ticketData.teachersContactPhone,
      'pending'
    )));
    this.router.navigate(['../'], {relativeTo: this.route});
    console.log(this.newTicketForm)
  }

  allowedEmails(control: FormControl): {[s: string]: boolean} {
    if(this.excludeProjectName.indexOf(control.value) !== -1) {
      return {'excludeProjectName': true}
    } else {
      return null;
    }
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
