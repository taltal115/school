import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent
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
    EffectsModule.forRoot([AuthEffects, TicketEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
