import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStartComponent } from './ticket-start.component';

describe('TicketStartComponent', () => {
  let component: TicketStartComponent;
  let fixture: ComponentFixture<TicketStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
