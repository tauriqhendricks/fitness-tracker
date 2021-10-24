import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./auth.actions";

export interface IState {
  isAuthenticated: boolean;
}

const initialState: IState = {
  isAuthenticated: false
}

/** takes old state and incoming action, returns a new state */
export function authReducer(state = initialState, action: AuthActions): IState {

  // actions must have a type

  switch (action.type) {

    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };

    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };

    default:
      return state;

  }

}

/** returns IState */
export const getIsAuth = (state: IState) => state.isAuthenticated;
