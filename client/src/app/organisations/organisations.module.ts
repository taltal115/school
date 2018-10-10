import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModules} from '../shared/shared.modules';
import {organisationReducer} from './store/organisation.reducers';
import {OrganisationsRoutingModule} from './organisations-routing.module';
import {AuthGuard} from "../auth/auth-guard.service";
import {OrganisationsComponent} from "./organisations.component";
import {OrganisationListComponent} from "./organisation-list/organisation-list.component";
import {OrganisationNewComponent} from "./organisation-new/organisation-new.component";
import {OrganisationEditComponent} from "./organisation-edit/organisation-edit.component";

@NgModule({
  declarations: [
    OrganisationsComponent,
    OrganisationListComponent,
    OrganisationNewComponent,
    OrganisationEditComponent
  ],
  imports: [
    CommonModule, //Must be here
    ReactiveFormsModule,
    SharedModules,
    FormsModule,
    OrganisationsRoutingModule,
    StoreModule.forFeature('organisations', organisationReducer),
  ],
  providers: [AuthGuard]
})
export class OrganisationsModule {}
