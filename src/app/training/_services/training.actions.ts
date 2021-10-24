import { Action } from "@ngrx/store";

import { IExercise } from "../_models/iexercise.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_ACTIVE_TRAINING = '[Training] Start Active Training';
export const STOP_ACTIVE_TRAINING = '[Training] Stop Active Training';

export class SetAvailableTrainings implements Action {

  readonly type = SET_AVAILABLE_TRAININGS;

  // this is how to set up a action that can also have a payload
  constructor(public payload: IExercise[]) { }

}

export class SetFinishedTrainings implements Action {

  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: IExercise[]) { }

}

export class StartActiveTraining implements Action {

  readonly type = START_ACTIVE_TRAINING;
  constructor(public payload: string) { }

}

export class StopActiveTraining implements Action {

  readonly type = STOP_ACTIVE_TRAINING;
  // no payload bc we already have to active training in the StartActiveTraining
  // it will already be in the store

}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartActiveTraining
  | StopActiveTraining;
