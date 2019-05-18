import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { StorageService } from '../service/storage.service';
import { SignUpInfo } from '../model/signup-info';

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

  authorities = [
    {
      value: 'AUTHORITY_DRIVER',
      label: 'Водитель'
    },
    {
      value: 'AUTHORITY_PASSENGER',
      label: 'Пассажир'
    }
  ];

  constructor(private fb: FormBuilder,
              private location: Location,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
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
      authority: this.fb.control(null, [Validators.required]),
      car: this.carForm
    });
  }

  changeAuthority(authority: string) {
    if (authority === 'AUTHORITY_DRIVER') {
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

    if (this.signupForm.valid || (this.signupForm.value.authority === 'driver' && this.signupForm.valid && this.carForm.valid)) {
      this.signupInfo = new SignUpInfo(
        this.signupForm.value.username,
        this.signupForm.value.password,
        this.signupForm.value.email,
        this.signupForm.value.authority,
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.middleName,
        this.signupForm.value.car.model ? this.signupForm.value.car : null
      );

      this.authService.signUp(this.signupInfo).subscribe(
        response => {
          console.log(response);
          this.authService.signIn(this.signupForm.value.username, this.signupForm.value.password).subscribe(
            response1 => {
              console.log(response1);
              this.storageService.saveToken(response1);
              this.userService.getUser().subscribe(
                response2 => {
                  console.log(response2);
                  this.storageService.saveUser(response2);
                  this.router.navigateByUrl('/queue/v/f').then();
                },
                error => {
                  console.log(error);
                }
              );
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
