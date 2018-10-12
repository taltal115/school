import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListComponent } from './ticket-list.component';
import {TicketsService} from "../tickets.service";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";

describe('OrganisationListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

  let ticketService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListComponent ],
      providers: [ {
        provide: TicketsService,
        useValue: jasmine.createSpyObj('ticketService', ['getTickets'])
      }
  ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
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
