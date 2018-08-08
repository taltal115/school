import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, map, take} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

// import * as RecipeActions from '../store/recipe.actions';
import * as fromTicket from './ticket.reducers';
import {Store} from '@ngrx/store';
import * as TicketActions from './ticket.actions';
import {Ticket} from "../ticket.model";

@Injectable()
export class TicketEffects {
  // @Effect({dispatch: false})
  @Effect()
  ticketFetch = this.actions$
    .ofType(TicketActions.FETCH_TICKETS)
    .pipe(switchMap((action: TicketActions.FetchTickets) => {
      console.log('FETCH_TICKETS: ',action)
      return this.httpClient.get<Ticket[]>('http://localhost:3000/tickets', {
        observe: 'body',
        responseType: 'json'
      })
    }), map(
        (tickets) => {
          console.log(tickets)
          // for (let recipe of recipes) {
          //   if (!recipe['ingredients']) {
          //     recipe['ingredients'] = [];
          //   }
          // }
          return {
            type: TicketActions.SET_TICKETS,
            payload: tickets
          };
        }
      ));


  @Effect({dispatch: false})
  ticketStore = this.actions$
    .ofType(TicketActions.SET_TICKET)
    .pipe(take(1),
      switchMap((action: TicketActions.SetTicket) => {
      const req = new HttpRequest(
        'POST',
        'http://localhost:3000/tickets',
        action.payload,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromTicket.FeatureState>
  ) {}
}
