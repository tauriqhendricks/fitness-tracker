import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TrainingService } from '../_services/training.service';
import * as fromTraining from '../_services/training.reducer'

import { StopTrainingComponent } from './stop-training.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress: number = 0;
  timer: number = 0;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>) { }

  ngOnInit(): void {

    this.startOrResumeTimer();

  }

  onStopTimer(): void {

    this.stopTimer();

  }

  startOrResumeTimer(): void {

    this.store.pipe(select(fromTraining.getActiveTraining),
      take(1)) // only want this to happen once, otherwise evertime the active training is changed we will run this
      .subscribe(activeExercise => {

        const step = (activeExercise.duration / 100) * 1000;
        this.timer = window.setInterval(() => {

          this.progress += 1;

          if (this.progress >= 100) {

            this.trainingService.completeExercise();
            clearInterval(this.timer);

          }

        }, step);

      });

  }

  stopTimer(): void {

    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {

        if (result)
          this.trainingService.cancelExercise(this.progress);
        else
          this.startOrResumeTimer();

      }
    );

  }

}
