import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/_services/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


// define the application wide state
export interface IState {

  ui: fromUI.IState;
  auth: fromAuth.IState;

}

// maps all the reducers
export const reducers: ActionReducerMap<IState> = {

  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer

}

// allow us to get quick access to the ui.state which is returned by the ui.reducer
export const getUiState = createFeatureSelector<fromUI.IState>('ui');
// telling the function what to do with getUiState
// give us the isloading property in ui state
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.IState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
