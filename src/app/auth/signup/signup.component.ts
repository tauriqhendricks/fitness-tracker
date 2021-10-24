import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date = new Date();
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>) { }

  ngOnInit(): void {
    
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));

    // 18 years ago from today, need to be at least 18 to signup
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }

  onSubmit(form: NgForm): void {

    this.authService.registerUser({

      email: form.value.email,
      password: form.value.password

    });

  }

}
