import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UIService } from 'src/app/shared/_services/ui.service';
import { TrainingService } from 'src/app/training/_services/training.service';
import { IAuthData } from '../_models/iauth-data.model';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Auth from '../_services/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.IState>) { }

  initAuthListener(): void {

    this.afAuth.authState.subscribe(user => {
      if (!user) {

        this.trainingService.cancelSubsciptions();
        this.store.dispatch(new Auth.SetUnauthenticated);
        this.router.navigate(['/login']);

        return;

      }

      this.store.dispatch(new Auth.SetAuthenticated);
      this.router.navigate(['/training']);

    });

  }

  registerUser(authData: IAuthData): void {

    // this.uiService.loadingStateChanged.next(true);
    // using the store instead of uiservice to control the state of isloading
    // this.store.dispatch({ type: 'START_LOADING' });
    this.store.dispatch(new UI.StartLoading());

    // angularfirestore handles the token for us
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        // this.store.dispatch({ type: 'STOP_LOADING' });
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        // this.store.dispatch({ type: 'STOP_LOADING' });
        this.store.dispatch(new UI.StopLoading());

        this.handleError(error);
      });

    // this.user = {

    //   id: Math.round(Math.random() * 10000).toString(),
    //   email: authData.email

    // }

  }

  login(authData: IAuthData): void {

    // this.uiService.loadingStateChanged.next(true);
    // this.store.dispatch({ type: 'START_LOADING' });
    this.store.dispatch(new UI.StartLoading());


    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        // this.store.dispatch({ type: 'STOP_LOADING' });
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        // this.store.dispatch({ type: 'STOP_LOADING' });
        this.store.dispatch(new UI.StopLoading());
    
        this.handleError(error);
      });

  }

  logout(): void {

    this.afAuth.signOut();

  }

  // getUser() {

  // returns a brand new user instead of a referance
  // you can change the value of the referance and this will return that change which we do not want
  // return { ...this.user };

  // }

  private handleError(error: HttpErrorResponse): void {

    const errorMessage = error.message.substring(10, error.message.indexOf(" (auth/"))
    this.uiService.showSnackBar(errorMessage, null, 3000);

  }

}
