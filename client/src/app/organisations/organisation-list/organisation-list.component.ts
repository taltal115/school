import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import * as OrganisationsActions from '../store/organisation.actions'
import {Organisation} from "../organisation.model";
import * as TicketActions from "../../tickets/store/ticket.actions";

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css']
})
export class OrganisationListComponent implements OnInit, OnDestroy {
  organisations: Organisation[];
  editMode = false;
  serviceCallCount: number;
  textValue: string;
  statuses: boolean[] = [true, false];
  subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<OrganisationsActions.All>
  ) { }

  ngOnInit() {
    const accessToken = JSON.parse(localStorage.getItem('user'));
    console.log(`%c 
user: ${(accessToken).id}
email: ${(accessToken).email}`,'background: green;font-size: 16px;'
    );

    this.store.dispatch(new OrganisationsActions.FetchOrganisations())

    this.subscription = this.store.select('organisations').subscribe((result) => {
      console.log("organisations : ",result)
      this.serviceCallCount = result.organisations.length;
      result.organisations.map((value: any) => {
        value.editMode = false;
      });
      this.organisations = result.organisations;
    });
  }

  onNewOrganisation() {
    // this.router.navigate(['/organisations/new'], {relativeTo: this.route});
    this.router.navigate(['organisations/new']);
  }

  onDeleteRow(index, organisation) {
    console.log(organisation);
    this.store.dispatch(new OrganisationsActions.DeleteRow({index: index, organisation: organisation}));
  }

  onEditRow(organisation, i) {
    this.editMode = true;
    organisation.editMode = true;
    console.log(organisation)
    console.log(this.organisations[i])
    console.log("index: ",i)
  }

  onEditSaveRow(value, organisation) {
    console.log(value);
    console.log(organisation);
    organisation.status = value;
    this.editMode = false;
    organisation.editMode = false;
  }

  fillForm(organisation) {
    console.log(organisation)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
