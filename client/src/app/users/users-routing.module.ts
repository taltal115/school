import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {NewUserComponent} from "./new-user/new-user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";

const usersRoutes: Routes = [
  // { path: '', component: TicketsComponent, children: [
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
    { path: 'users/new', component: NewUserComponent, canActivate: [AuthGuard] },
    { path: 'users/edit/:_id', component: UserEditComponent, canActivate: [AuthGuard] },
  // ] }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
