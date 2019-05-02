import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private location: Location,
              private router: Router,
              private authService: AuthService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required])
    });

    if (this.storageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  auth() {
    console.log(JSON.stringify(this.authForm.value));

    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value).subscribe(
        data => {
          console.log(data);
          this.storageService.saveToken(data.accessToken);
          this.storageService.saveUser(data.user);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigateByUrl('/lk').then();
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
