import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IExercise } from '../_models/exercise.model';
import { TrainingService } from '../_services/training.service';

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

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();

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
