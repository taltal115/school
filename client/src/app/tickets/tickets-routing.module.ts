import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TicketEditComponent} from './ticket-edit/ticket-edit.component';
import {TicketsComponent} from './tickets.component';
import {TicketStartComponent} from './ticket-start/ticket-start.component';

const ticketsRoutes: Routes = [
  { path: '', component: TicketsComponent, children: [
    { path: '', component: TicketStartComponent},
    { path: 'new', component: TicketEditComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(ticketsRoutes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
