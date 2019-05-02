import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AuthLoginInfo } from '../model/login-info';
import { SignUpInfo } from '../model/signup-info';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  carForm: FormGroup;

  signupInfo: SignUpInfo;

  errorMessage = '';

  roles = [
    {
      value: 'driver',
      label: 'Водитель'
    },
    {
      value: 'passenger',
      label: 'Пассажир'
    }
  ];

  constructor(private fb: FormBuilder,
              private location: Location,
              private router: Router,
              private authService: AuthService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.carForm = this.fb.group({
      model: this.fb.control(null),
      regNumber: this.fb.control(null),
      color: this.fb.control(null)
    });
    this.signupForm = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null),
      middleName: this.fb.control(null),
      role: this.fb.control(null, [Validators.required]),
      car: this.carForm
    });
  }

  changeRole(role: string) {
    console.log(role);
    if (role === 'driver') {
      this.setValidators(this.carForm);
    } else {
      this.carForm.reset();
      this.clearValidators(this.carForm);
    }
  }

  setValidators(fg: FormGroup) {
    for (let field in fg.controls) {
      const control = fg.get(field);
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    }
  }

  clearValidators(fg: FormGroup) {
    for (let field in fg.controls) {
      const control = fg.get(field);
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }

  register() {
    console.log(JSON.stringify(this.signupForm.value));
    console.log(JSON.stringify(this.signupForm.value.role));

    if (this.signupForm.valid || (this.signupForm.value.role === 'driver' && this.signupForm.valid && this.carForm.valid)) {
      this.signupInfo = new SignUpInfo(
        this.signupForm.value.username,
        this.signupForm.value.password,
        this.signupForm.value.email,
        this.signupForm.value.role,
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.middleName,
        this.signupForm.value.car.model ? this.signupForm.value.car : null
      );

      this.authService.signUp(this.signupInfo).subscribe(
        response => {
          console.log(response);
          this.authService.signIn(new AuthLoginInfo(this.signupForm.value.username, this.signupForm.value.password)).subscribe(
            response1 => {
              console.log(response1);
              this.storageService.saveToken(response1.accessToken);
              this.storageService.saveUser(response1.user);
              this.router.navigateByUrl('/lk').then();
            },
            error => {
              console.log(error);
              this.errorMessage = error.error.message;
            }
          );
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
