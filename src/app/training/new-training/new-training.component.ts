import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IExercise } from '../_models/iexercise.model';
import { TrainingService } from '../_services/training.service';
import * as fromTraining from '../_services/training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<IExercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>) { }

  ngOnInit(): void {

    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.exercises$ = this.store.pipe(select(fromTraining.getAvailableExercises));
    this.fetchExercises();

  }

  onStartTraining(form: NgForm): void {

    this.trainingService.startExercise(form.value.exercise);

  }

  fetchExercises(): void {

    this.trainingService.fetchAvailableExercises();

  }

  onFetchExercises(): void {

    this.fetchExercises();

  }

}
