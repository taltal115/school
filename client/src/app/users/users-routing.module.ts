import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {NewUserComponent} from "./new-user/new-user.component";
import {UsersComponent} from "./users.component";
import {UserListComponent} from "./user-list/user-list.component";
import {TicketStartComponent} from "../tickets/ticket-start/ticket-start.component";

const usersRoutes: Routes = [
  // { path: '', component: TicketsComponent, children: [
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
    { path: 'users/new', component: NewUserComponent, canActivate: [AuthGuard] },
  // ] }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
