import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';

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
              private userService: UserService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required])
    });
  }

  auth() {
    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value.username, this.authForm.value.password).subscribe(
        response => {
          console.log(response);
          this.storageService.saveToken(response);
          this.userService.getUser().subscribe(
            response1 => {
              console.log(response1);
              this.storageService.saveUser(response1);
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
    }
  }

  cancel() {
    this.location.back();
  }
}
