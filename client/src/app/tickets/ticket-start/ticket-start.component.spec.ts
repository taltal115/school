import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStartComponent } from './ticket-start.component';
import {TicketsService} from "../tickets.service";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";

describe('OrganisationListComponent', () => {
  let component: TicketStartComponent;
  let fixture: ComponentFixture<TicketStartComponent>;

  let ticketService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketStartComponent ],
      providers: [ {
        provide: TicketsService,
        useValue: jasmine.createSpyObj('ticketService', ['getTickets'])
      }
  ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch ticket onInit', (done: any) => {
    ticketService.getTickets.and.returnValue(of({}));
    component.ngOnInit()
    fixture.detectChanges();

    ticketService.getTickets.subscribe((dagta: any) => {
      expect()
    })

  });
});
