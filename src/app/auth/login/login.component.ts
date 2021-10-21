import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/_services/ui.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  isLoading = false;
  private loadingStateSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['teat@teat.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.loadingStateSub = this.uiService.loadingStateChanged
      .subscribe(loadiingState => {
        this.isLoading = loadiingState;
      });

  }

  onSubmit(): void {

    this.authService.login({

      email: this.form.value.email,
      password: this.form.value.password

    });

  }

  ngOnDestroy(): void {

    if (this.loadingStateSub)
      this.loadingStateSub.unsubscribe();

  }

}
