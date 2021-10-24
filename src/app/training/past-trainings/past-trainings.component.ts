import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IExercise } from '../_models/iexercise.model';
import { TrainingService } from '../_services/training.service';
import * as fromTraining from '../_services/training.reducer';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource: MatTableDataSource<IExercise> = new MatTableDataSource<IExercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // finishedExercisesSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>) { }

  ngOnInit(): void {
    // th:note this updates the table live, if I goto firebase and delete or add it automatically changes
    // th:note try this in other projects to see if the same happens 
    // this.finishedExercisesSubs = this.trainingService.finishedExercisesChanged
    //   .subscribe((exercises: IExercise[]) => this.dataSource.data = exercises);

    this.store.select(fromTraining.getFinishedExercises) // we want future updates so no take(1)
      .subscribe((exercises: IExercise[]) => this.dataSource.data = exercises);

    this.trainingService.fetchCompletedOrCancelledExercises();

  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  doFilter(event: KeyboardEvent): void {

    this.dataSource.filter = (<HTMLInputElement>event.target).value
      .trim()
      .toLowerCase();

  }

}
