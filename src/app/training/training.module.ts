import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './_services/training.reducer';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule { }
