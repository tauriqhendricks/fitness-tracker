import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/_services/ui.service';
import { IExercise } from '../_models/iexercise.model';
import { TrainingService } from '../_services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: IExercise[] = [];
  private exerciseSubs: Subscription;

  isLoading = false;
  private loadingStateSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService) { }

  ngOnInit(): void {

    this.loadingStateSubs = this.uiService.loadingStateChanged
      .subscribe(loadiingState => {
        this.isLoading = loadiingState;
      });

    this.exerciseSubs = this.trainingService.exercisesChanged
      .subscribe(exercises => {
        this.exercises = exercises;
      });

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

  ngOnDestroy(): void {

    if (this.exerciseSubs)
      this.exerciseSubs.unsubscribe();

    if (this.loadingStateSubs)
      this.loadingStateSubs.unsubscribe();

  }

}
