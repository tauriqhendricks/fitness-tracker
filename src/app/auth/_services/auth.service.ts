import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingService } from 'src/app/training/_services/training.service';
import { IAuthData } from '../_models/iauth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService) { }

  initAuthListener(): void {

    this.afAuth.authState.subscribe(user => {
      if (user === null) {

        this.trainingService.cancelSubsciptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);

        return;

      }

      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/training']);

    });

  }

  registerUser(authData: IAuthData): void {

    // angularfirestore handles the token for us

    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // this.user = {

    //   id: Math.round(Math.random() * 10000).toString(),
    //   email: authData.email

    // }


  }

  login(authData: IAuthData): void {

    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

  }

  logout(): void {

    this.afAuth.signOut();

  }

  // getUser() {

  // returns aa brand new user instead of a referance
  // you can change the value of the referance and this will return that change which we do not want
  // return { ...this.user };

  // }

  isAuth(): boolean {

    return this.isAuthenticated;

  }

}
