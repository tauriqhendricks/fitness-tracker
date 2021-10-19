import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

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
