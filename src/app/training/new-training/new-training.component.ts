import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from '../_models/exercise.model';
import { TrainingService } from '../_services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: IExercise[] = []

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.exercises = this.trainingService.getAvailableExercises();

  }

  onStartTraining(form: NgForm): void {

    this.trainingService.startExercise(form.value.exercise);

  }

}
