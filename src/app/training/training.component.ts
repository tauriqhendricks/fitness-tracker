import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './_services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining: boolean = false;
  exerciseSubs: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.exerciseSubs = this.trainingService.exerciseChanged.subscribe(
      exercise => {

        if (exercise) {
          this.onGoingTraining = true
          return;
        }

        this.onGoingTraining = false

      }
    );

  }

  ngOnDestroy(): void {

    if (this.exerciseSubs)
      this.exerciseSubs.unsubscribe();

  }

}
