import {Organisation} from '../organisation.model';
import * as OrganisationActions from './organisation.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
  organisations: State
}

export interface State {
  organisations: Organisation[];
}

const initialState: State = {
  organisations: [
    // new Ticket(
    //   new Date(),
    //   'Tasty Schnitzel',
    //   'A su just awesome!',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'JPG',
    //   'עדיין לא טופל'
    //   ),
  ]
};

export function organisationReducer(state = initialState, action: OrganisationActions.All) {
  switch(action.type) {
    case (OrganisationActions.SET_ORGANISATION):
      const resObj = {
        ...state,
        organisations: [...state.organisations, action.payload]
      };
      // console.log(state.tickets);
      // console.log(action.payload);
      // console.log(resObj);
      return resObj;
    case (OrganisationActions.SET_ORGANISATIONS):
      return {
        ...state,
        organisations: [...action.payload]
      };
    case (OrganisationActions.UPDATE_ORGANISATION):
      const organisation = state.organisations[action.payload.index];
      const updatedOrganisation = {
        ...organisation,
        ...action.payload.organisation
      };
      const organisations = [...state.organisations];
      organisations[action.payload.index] = updatedOrganisation;
      return {
        ...state,
        organisations: organisations
      };
    default:
      return state;
  }
}
