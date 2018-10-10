import { Action } from '@ngrx/store';
import {Organisation} from "../organisation.model";

export const SET_ORGANISATION = 'SET_ORGANISATION';
export const SET_ORGANISATIONS = 'SET_ORGANISATIONS';
export const DELETE_ORGANISATION = 'DELETE_ORGANISATION';
export const FETCH_ORGANISATIONS = 'FETCH_ORGANISATIONS';
export const UPDATE_ORGANISATION = 'UPDATE_ORGANISATION';

export class SetOrganisation implements Action {
  readonly type = SET_ORGANISATION;

  constructor(public payload: Organisation) {}
}

export class SetOrganisations implements Action {
  readonly type = SET_ORGANISATIONS;

  constructor(public payload: Organisation[]) {}
}

export class DeleteRow implements Action {
  readonly type = DELETE_ORGANISATION;

  constructor(public payload: {index: number, organisation: Organisation}) {}
}

export class UpdateOrganisation implements Action {
  readonly type = UPDATE_ORGANISATION;

  constructor(public payload: {index: number, organisation: Organisation}) {}
}

export class FetchOrganisations implements Action {
  readonly type = FETCH_ORGANISATIONS;
}

export type All =
  SetOrganisation |
  SetOrganisations |
  DeleteRow |
  FetchOrganisations |
  UpdateOrganisation;

