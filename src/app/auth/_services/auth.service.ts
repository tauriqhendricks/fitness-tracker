import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IAuthData } from '../_models/auth-data.model';
import { IUser } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: IUser | null;
  authChange: Subject<boolean> = new Subject<boolean>();


  constructor(private router: Router) { }

  registerUser(authData: IAuthData): void {

    this.user = {

      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email

    }

    this.authSuccessful();

  }

  login(authData: IAuthData): void {

    this.user = {

      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email

    }

    this.authSuccessful();

  }

  logout(): void {

    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);

  }

  getUser() {

    // returns aa brand new user instead of a referance
    // you can change the value of the referance and this will return that change which we do not want
    return { ...this.user };

  }

  isAuth(): boolean {

    return this.user != null;

  }

  private authSuccessful(): void {

    this.authChange.next(true);
    this.router.navigate(['/training']);

  }

}
