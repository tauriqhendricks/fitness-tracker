import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/_services/ui.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date = new Date();

  isLoading = false;
  private loadingStateSub: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit(): void {

    // 18 years ago from today, need to be at least 18 to signup
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingStateSub = this.uiService.loadingStateChanged
      .subscribe(loadiingState => {
        this.isLoading = loadiingState;
      });

  }

  onSubmit(form: NgForm): void {

    this.authService.registerUser({

      email: form.value.email,
      password: form.value.password

    });

  }

  ngOnDestroy(): void {

    if (this.loadingStateSub)
      this.loadingStateSub.unsubscribe();

  }

}
