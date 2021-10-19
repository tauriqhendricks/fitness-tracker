import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IExercise } from '../_models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: IExercise[] = [

    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }

  ];

  private currentExercise: IExercise | null;
  exerciseChanged: Subject<IExercise | null> = new Subject<IExercise | null>();
  exercises: IExercise[] = [];

  getAvailableExercises(): IExercise[] {

    return this.availableExercises.slice();

  }

  getCurrentExercise(): IExercise {

    return { ...<IExercise>this.currentExercise };

  }

  getCompletedOrCancelledExercises(): IExercise[] {

    return this.exercises.slice();

  }

  startExercise(selectedId: string): void {

    this.currentExercise = <IExercise>this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.currentExercise });

  }

  completeExercise(): void {

    this.exercises.push({

      ...<IExercise>this.currentExercise,
      date: new Date,
      state: 'completed'

    });

    this.currentExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress: number): void {

    this.exercises.push({

      ...<IExercise>this.currentExercise,
      duration: this.currentExercise?.duration! * (progress / 100),
      calories: this.currentExercise?.calories! * (progress / 100),
      date: new Date,
      state: 'cancelled'

    });

    this.currentExercise = null;
    this.exerciseChanged.next(null);

  }

}
