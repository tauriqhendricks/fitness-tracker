import { START_LOADING, STOP_LOADING, UIActions } from "./ui.actions";

export interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false
}

/** takes old state and incoming action, returns a new state */
export function uiReducer(state = initialState, action: UIActions): IState {

  // actions must have a type

  switch (action.type) {

    case START_LOADING:
      return {
        isLoading: true
      };

    case STOP_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;

  }

}

/** returns IState */
export const getIsLoading = (state: IState) => state.isLoading;
