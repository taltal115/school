import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
// import {EffectsModule} from '@ngrx/effects';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModules} from '../shared/shared.modules';
import {ticketReducer} from './store/ticket.reducers';
import {TicketsComponent} from './tickets.component';
import {TicketNewComponent} from './ticket-new/ticket-new.component';
import {TicketsRoutingModule} from './tickets-routing.module';
import { TicketStartComponent } from './ticket-start/ticket-start.component';
import {ReactiveFormsComponent} from './ticket-new/reactive-forms/reactive-forms.component';
import {EffectsModule} from "@ngrx/effects";
import {TicketEffects} from "./store/ticket.effects";
import {AuthGuard} from "../auth/auth-guard.service";
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

@NgModule({
  declarations: [
    TicketsComponent,
    TicketNewComponent,
    TicketStartComponent,
    ReactiveFormsComponent,
    TicketEditComponent
  ],
  imports: [
    CommonModule, //Must be here
    ReactiveFormsModule,
    SharedModules,
    FormsModule,
    TicketsRoutingModule,
    StoreModule.forFeature('tickets', ticketReducer),
    EffectsModule.forRoot([TicketEffects])
  ],
  providers: [AuthGuard]
})
export class TicketsModule {}
