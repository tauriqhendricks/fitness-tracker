import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title> Are you sure?</h1>
            <mat-dialog-content>
              <p>You already got {{ passedDate.progress }}%</p>
            </mat-dialog-content>

            <mat-dialog-actions>
              <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
              <button mat-stroked-button color="primary" [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedDate: IStopTrainigPassedDate) { }

}

export interface IStopTrainigPassedDate {

  progress: number;

}
