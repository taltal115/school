import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {HomeComponent} from './core/home/home.component';
import {AuthGuard} from "./auth/auth-guard.service";
import {TicketsComponent} from "./tickets/tickets.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'tickets', loadChildren: './tickets/tickets.module#TicketsModule', canActivate: [AuthGuard]},
  { path: 'tickets', component:  TicketsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
