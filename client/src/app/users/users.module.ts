import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
// import {EffectsModule} from '@ngrx/effects';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModules} from '../shared/shared.modules';
import {EffectsModule} from "@ngrx/effects";
import {AuthGuard} from "../auth/auth-guard.service";
import {userReducer} from "./store/users.reducers";
import {UsersComponent} from "./users.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersEffects} from "./store/users.effects";
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule, //Must be here
    ReactiveFormsModule,
    SharedModules,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [AuthGuard]
})
export class UsersModule {}
