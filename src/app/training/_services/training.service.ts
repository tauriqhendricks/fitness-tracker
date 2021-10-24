import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UIService } from 'src/app/shared/_services/ui.service';
import { IExercise } from '../_models/iexercise.model';

import { select, Store } from '@ngrx/store';
// import * as fromRoot from '../../app.reducer';
// using fromTraining bc fromRoot does not know about the training reducer, lazy
import * as fromTraining from './training.reducer';
import * as UI from '../../shared/ui.actions';
import * as Training from './training.actions';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // private availableExercises: IExercise[] = [];
  // private currentExercise: IExercise;

  // exerciseChanged: Subject<IExercise> = new Subject<IExercise>();
  // exercisesChanged: Subject<IExercise[]> = new Subject<IExercise[]>();
  // finishedExercisesChanged: Subject<IExercise[]> = new Subject<IExercise[]>();

  // finishedExercises: IExercise[] = [];

  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.IState>) { }

  fetchAvailableExercises(): void {

    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...<IExercise>doc.payload.doc.data(), // pulling the data out of the returned object and add into the object which is returned
          };
        });
      }))
      .subscribe((exercises: IExercise[]) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());

        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());

        this.handleError('Fetching exercises failed, please try again later.');
        // this.exercisesChanged.next(null); // so we can allow the user to fetch the data on a button
      }));

  }

  // getCurrentExercise(): IExercise {

  //   return { ...<IExercise>this.currentExercise };

  // }

  fetchCompletedOrCancelledExercises(): void {

    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: IExercise[]) => {
        // this.finishedExercisesChanged.next(<IExercise[]>exercises);
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      }, error => {
        this.handleError('Fetching exercises failed, please try again later.');
      }));

  }

  private addDataToDatabase(exercise: IExercise): void {

    this.db.collection('finishedExercises').add(exercise);

  }

  startExercise(selectedId: string): void {

    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date});

    // this.currentExercise = <IExercise>this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({ ...this.currentExercise });
    this.store.dispatch(new Training.StartActiveTraining(selectedId));

  }

  completeExercise(): void {

    this.store.pipe(select(fromTraining.getActiveTraining),
      take(1)) // only want this to happen once, otherwise evertime the active training is changed we will run this
      .subscribe(activeExercise => {

        this.addDataToDatabase({

          ...<IExercise>activeExercise,
          date: new Date,
          state: 'completed'

        });

        // this.currentExercise = null;
        // this.exerciseChanged.next(null);
        this.store.dispatch(new Training.StopActiveTraining());

      });

  }

  cancelExercise(progress: number): void {

    this.store.pipe(select(fromTraining.getActiveTraining),
      take(1)) // only want this to happen once, otherwise evertime the active training is changed we will run this
      .subscribe(activeExercise => {

        this.addDataToDatabase({

          ...<IExercise>activeExercise,
          duration: activeExercise?.duration! * (progress / 100),
          calories: activeExercise?.calories! * (progress / 100),
          date: new Date,
          state: 'cancelled'

        });

        // this.currentExercise = null;
        // this.exerciseChanged.next(null);
        this.store.dispatch(new Training.StopActiveTraining());

      });

  }

  cancelSubsciptions(): void {

    this.fbSubs.forEach(sub => sub.unsubscribe());

  }

  private handleError(errorMessage: string): void {

    this.uiService.showSnackBar(errorMessage, null, 3000);

  }

}
