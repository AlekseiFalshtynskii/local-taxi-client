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
  }

  auth() {
    console.log(JSON.stringify(this.authForm.value));

    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value).subscribe(
        response => {
          console.log(response);
          this.storageService.saveToken(response.accessToken);
          this.storageService.saveUser(response.user);
          this.router.navigateByUrl('/lk').then();
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
