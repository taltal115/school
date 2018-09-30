import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {OrganisationListComponent} from "./organisation-list/organisation-list.component";
import {OrganisationNewComponent} from "./organisation-new/organisation-new.component";

const organisationsRoutes: Routes = [
    { path: 'organisations', component: OrganisationListComponent, canActivate: [AuthGuard]},
    { path: 'organisations/new', component: OrganisationNewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(organisationsRoutes)],
  exports: [RouterModule]
})
export class OrganisationsRoutingModule {}
