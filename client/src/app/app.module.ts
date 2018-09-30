import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import {environment} from '../environments/environment'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModules} from './shared/shared.modules';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from "./core/core.module";
import {reducers} from './store/app.reducers'
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TicketsModule} from './tickets/tickets.module';
import {TicketEffects} from "./tickets/store/ticket.effects";
import {AuthGuard} from "./auth/auth-guard.service";
import {UsersService} from "./users/users.service";
import {UsersEffects} from "./users/store/users.effects";
import {TicketsService} from "./tickets/tickets.service";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsersModule} from "./users/users.module";
import {OrganisationsModule} from "./organisations/organisations.module";
import {OrganisationsService} from "./organisations/organisations.service";
import {OrganisationEffects} from "./organisations/store/organisation.effects";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {PagerService} from "./shared/pager.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, //Contain common module and other bootstrap things
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AuthModule,
    TicketsModule,
    SharedModules,
    UsersModule,
    OrganisationsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, TicketEffects, OrganisationEffects, UsersEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    Ng4LoadingSpinnerModule.forRoot()
    // MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthGuard,
    UsersService,
    FormsModule,
    TicketsService,
    OrganisationsService,
    PagerService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
