import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  // isLoading:boolean = false;
  // convention to use $ at end of variable that are controlled by ngrx
  isLoading$: Observable<boolean>;

  // private loadingStateSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private uiService: UIService,
    private store: Store<fromRoot.IState>) { }

  ngOnInit(): void {

    // using this to check the value of isLoading
    // dont need to unsubscribe from ngrx store related things
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    // this.loadingStateSub = this.uiService.loadingStateChanged
    //   .subscribe(loadiingState => {
    //     this.isLoading = loadiingState;
    //   });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void {

    this.authService.login({

      email: this.form.value.email,
      password: this.form.value.password

    });

  }

}
