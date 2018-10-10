import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import * as OrganisationsActions from '../store/organisation.actions'
import {Organisation} from "../organisation.model";
import * as TicketActions from "../../tickets/store/ticket.actions";
import {PagerService} from "../../shared/pager.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // transition('void => *', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(-100px)'
      //   }),
      //   animate(300)
      // ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(-100px)',
          opacity: 0
        }))
      ]),
    ])
  ]
})
export class OrganisationListComponent implements OnInit, OnDestroy {
  organisations: Organisation[];
  editMode = false;
  organisationsCount: number;
  textValue: string;
  statuses: boolean[] = [true, false];
  subscription;
  pager: any = {};
  pagedItems: any[];
  searchString: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<OrganisationsActions.All>,
    private pagerService: PagerService
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
      this.organisationsCount = result.organisations.length;
      result.organisations.map((value: any) => {
        value.editMode = false;
      });
      this.organisations = result.organisations;
      this.setPage(1);
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.organisations.length, page);

    // get current page of items
    this.pagedItems = this.organisations.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onNewOrganisation() {
    // this.router.navigate(['/organisations/new'], {relativeTo: this.route});
    this.router.navigate(['organisations/new']);
  }

  onDeleteRow(index, organisation) {
    console.log(organisation);
    if(confirm('האם אתה בטוח שתרצה למחוק את הארגון?')) {
      this.store.dispatch(new OrganisationsActions.DeleteRow({index: index, organisation: organisation}));
    }
  }

  onEditRow(organisation, i) {
    this.router.navigate(['organisations/edit/'+organisation._id]);

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
