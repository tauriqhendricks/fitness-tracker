import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['teat@teat.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

  }

  onSubmit(): void {

    this.authService.login({

      email: this.form.value.email,
      password: this.form.value.password

    });

  }

}
