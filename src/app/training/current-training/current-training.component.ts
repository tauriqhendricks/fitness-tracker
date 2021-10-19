import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../_services/training.service';

import { StopTrainingComponent } from './stop-training.component';

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
    private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.startOrResumeTimer();

  }

  onStopTimer(): void {

    this.stopTimer();

  }

  startOrResumeTimer(): void {

    const step = (this.trainingService.getCurrentExercise().duration / 100) * 1000;

    this.timer = window.setInterval(() => {

      this.progress += 1;

      if (this.progress >= 100) {

        this.trainingService.completeExercise();
        clearInterval(this.timer);

      }

    }, step);

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
