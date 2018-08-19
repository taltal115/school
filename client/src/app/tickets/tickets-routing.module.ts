import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TicketEditComponent} from './ticket-edit/ticket-edit.component';
import {TicketsComponent} from './tickets.component';
import {TicketStartComponent} from './ticket-start/ticket-start.component';
import {AuthGuard} from "../auth/auth-guard.service";

const ticketsRoutes: Routes = [
  // { path: '', component: TicketsComponent, children: [
    { path: 'tickets', component: TicketStartComponent, canActivate: [AuthGuard]},
    { path: 'tickets/new', component: TicketEditComponent, canActivate: [AuthGuard] },
  // ] }
];

@NgModule({
  imports: [RouterModule.forChild(ticketsRoutes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
