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
import { UsersComponent } from './users/users.component';
import {UsersService} from "./users/users.service";
import {UsersEffects} from "./users/store/users.effects";
import {TicketsService} from "./tickets/tickets.service";
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule, //Contain common module and other bootstrap things
    HttpClientModule,
    AuthModule,
    TicketsModule,
    SharedModules,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, TicketEffects, UsersEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthGuard,
    UsersService,
    TicketsService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
