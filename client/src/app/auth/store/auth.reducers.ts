import { User } from '../../models/user';
import { All } from './auth.actions';
import * as AuthActionTypes from './auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload._id,
          token: action.payload.token,
          email: action.payload.email,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          userRole: action.payload.userRole,
          orgId: action.payload.orgId
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        // user: {
        //   id: action.payload._id,
        //   token: action.payload.token,
        //   email: action.payload.email,
        //   fullName: action.payload.fullName,
        //   phoneNumber: action.payload.phoneNumber,
        //   userRole: action.payload.userRole,
        //   orgId: action.payload.orgId
        // },
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.SET_TOKEN: {
      const userObj = {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null
      };
      return userObj;
    }
    default: {
      return state;
    }
  }
}
