import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IExercise } from "../_models/iexercise.model";
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_ACTIVE_TRAINING, STOP_ACTIVE_TRAINING } from "./training.actions";
import * as fromRoot from "../../app.reducer";


// we want to manage this
// state for this module
export interface ITrainingState {

  availableExercises: IExercise[];
  finishedExercises: IExercise[];
  activeExercise: IExercise;

}

// extend the root state
// doing this bc the training module is lazy loaded
// we dont need to load this code bc we dont know if we will ever need it
// app state doesnot know about the training state, but the training state knows about the app state
// when we load this module lazily it will merge behind the scenes
// this will become the new global state after the module has been lazy loaded
export interface IState extends fromRoot.IState {

  training: ITrainingState;

}

const initialState: ITrainingState = {

  availableExercises: [],
  finishedExercises: [],
  activeExercise: null

}

/** takes old state and incoming action, returns a new state */
export function trainingReducer(state = initialState, action: TrainingActions) {

  // actions must have a type

  switch (action.type) {

    case SET_AVAILABLE_TRAININGS:
      return {
        ...state, // adds existing finishedExercises and activeExercises, availableExercises is being overided
        availableExercises: action.payload
      };

    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case START_ACTIVE_TRAINING:
      return {
        ...state,
        activeExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) } // created imutable object
      };

    case STOP_ACTIVE_TRAINING:
      return {
        ...state,
        activeExercise: null
      };

    default:
      return state;

  }

}

/** returns IState */ // do this here bc lazy loaded, indentifier 'training' has to match one on training module
export const getTrainingState = createFeatureSelector<ITrainingState>('training');
// do these here bc lazy loaded
export const getAvailableExercises = createSelector(getTrainingState, (state: ITrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: ITrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: ITrainingState) => state.activeExercise);
export const getIsTraining = createSelector(getTrainingState, (state: ITrainingState) => state.activeExercise != null); // if training is active , only want to check for null

// lazy loaded reducers must be added to its module not the app.module
