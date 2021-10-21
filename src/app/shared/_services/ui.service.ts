import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  loadingStateChanged: Subject<boolean> = new Subject();

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, action: string | null, duration: number): void {

    this.snackBar.open(message, action, {
      duration: duration
    });

  }

}
