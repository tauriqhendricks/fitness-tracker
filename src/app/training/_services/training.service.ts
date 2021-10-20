import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExercise } from '../_models/iexercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: IExercise[] = [];
  private currentExercise: IExercise;

  exerciseChanged: Subject<IExercise> = new Subject<IExercise>();
  exercisesChanged: Subject<IExercise[]> = new Subject<IExercise[]>();
  finishedExercisesChanged: Subject<IExercise[]> = new Subject<IExercise[]>();

  finishedExercises: IExercise[] = [];

  private fbSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises(): void {

    this.fbSubscriptions.push(this.db
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        console.log(error);
      }));

  }

  getCurrentExercise(): IExercise {

    return { ...<IExercise>this.currentExercise };

  }

  fetchCompletedOrCancelledExercises(): void {

    this.fbSubscriptions.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: IExercise[]) => {
        this.finishedExercisesChanged.next(<IExercise[]>exercises);
      }, error => {
        console.log(error);
      }));

  }

  private addDataToDatabase(exercise: IExercise): void {

    this.db.collection('finishedExercises').add(exercise);

  }

  startExercise(selectedId: string): void {

    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date});

    this.currentExercise = <IExercise>this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.currentExercise });

  }

  completeExercise(): void {

    this.addDataToDatabase({

      ...<IExercise>this.currentExercise,
      date: new Date,
      state: 'completed'

    });

    this.currentExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress: number): void {

    this.addDataToDatabase({

      ...<IExercise>this.currentExercise,
      duration: this.currentExercise?.duration! * (progress / 100),
      calories: this.currentExercise?.calories! * (progress / 100),
      date: new Date,
      state: 'cancelled'

    });

    this.currentExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelSubsciptions(): void {

    this.fbSubscriptions.forEach(sub => sub.unsubscribe());

  }

}
