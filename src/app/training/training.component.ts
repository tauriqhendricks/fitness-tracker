import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromTraining from './_services/training.reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.IState>) { }

  ngOnInit(): void {

    this.onGoingTraining$ = this.store.pipe(select(fromTraining.getIsTraining));

  }

}
