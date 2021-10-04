import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {

    // 18 years ago from today, need to be at least 18 to signup
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }

  onSubmit(form: NgForm): void {

    console.log('form', form);
    

  }

}
