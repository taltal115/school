import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TicketNewComponent} from './ticket-new/ticket-new.component';
import {TicketsComponent} from './tickets.component';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {AuthGuard} from "../auth/auth-guard.service";
import {TicketEditComponent} from "./ticket-edit/ticket-edit.component";

const ticketsRoutes: Routes = [
  // { path: '', component: TicketsComponent, children: [
    { path: 'tickets', component: TicketListComponent, canActivate: [AuthGuard]},
    { path: 'tickets/new', component: TicketNewComponent, canActivate: [AuthGuard] },
    { path: 'tickets/edit/:_id', component: TicketEditComponent, canActivate: [AuthGuard] },
  // ] }
];

@NgModule({
  imports: [RouterModule.forChild(ticketsRoutes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
