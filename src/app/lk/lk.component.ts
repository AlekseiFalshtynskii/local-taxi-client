import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CarService } from '../service/car.service';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Car } from '../model/car';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LKComponent implements OnInit {

  user: User;

  usernameForm: FormGroup;

  passwordForm: FormGroup;

  emailForm: FormGroup;

  fioForm: FormGroup;

  carForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private carService: CarService,
              private userService: UserService,
              public storageService: StorageService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      response => {
        console.log(response);
        this.user = response;
        this.initForms();
      },
      error => {
        console.log(error);
      }
    );
  }

  initForms() {
    this.usernameForm = this.fb.group({
      username: this.fb.control(this.user.username, [Validators.required])
    });
    this.usernameForm.disable();

    this.passwordForm = this.fb.group({
      oldPassword: this.fb.control(null, [Validators.required]),
      newPassword: this.fb.control(null, [Validators.required]),
      newPasswordR: this.fb.control(null, [Validators.required])
    });
    this.passwordForm.disable();

    this.emailForm = this.fb.group({
      email: this.fb.control(this.user.email, [Validators.required])
    });
    this.emailForm.disable();

    this.fioForm = this.fb.group({
      firstName: this.fb.control(this.user.firstName, [Validators.required]),
      lastName: this.fb.control(this.user.lastName),
      middleName: this.fb.control(this.user.middleName)
    });
    this.fioForm.disable();

    if (this.storageService.isDriver()) {
      this.carForm = this.fb.group({
        model: this.fb.control(this.user.car.model, [Validators.required]),
        regNumber: this.fb.control(this.user.car.regNumber, [Validators.required]),
        color: this.fb.control(this.user.car.color, [Validators.required])
      });
      this.carForm.disable();
    }
  }

  usernameFormDisable() {
    this.usernameForm.get('username').setValue(this.user.username);
    this.usernameForm.disable();
  }

  passwordFormDisable() {
    for (let field in this.passwordForm.controls) {
      this.passwordForm.get(field).reset();
    }
    this.passwordForm.disable();
  }

  emailFormDisable() {
    this.emailForm.get('email').setValue(this.user.email);
    this.emailForm.disable();
  }

  fioFormDisable() {
    this.fioForm.get('firstName').setValue(this.user.firstName);
    this.fioForm.get('lastName').setValue(this.user.lastName);
    this.fioForm.get('middleName').setValue(this.user.middleName);
    this.fioForm.disable();
  }

  carFormDisable() {
    this.carForm.get('model').setValue(this.user.car.model);
    this.carForm.get('regNumber').setValue(this.user.car.regNumber);
    this.carForm.get('color').setValue(this.user.car.color);
    this.carForm.disable();
  }

  saveLogin() {
    this.userService.saveUsername(this.usernameForm.get('username').value).subscribe(
      response => {
        console.log(response);
        this.user.username = this.usernameForm.get('username').value;
        this.storageService.saveUser(this.user);
        this.usernameForm.disable();
      },
      error => {
        console.log(error);
      }
    );
  }

  savePassword() {
    this.userService.savePassword(this.passwordForm.get('oldPassword').value, this.passwordForm.get('newPassword').value).subscribe(
      response => {
        console.log(response);
        this.passwordForm.disable();
      },
      error => {
        console.log(error);
      }
    );
  }

  saveEmail() {
    this.userService.saveEmail(this.emailForm.get('email').value).subscribe(
      response => {
        console.log(response);
        this.user.email = this.emailForm.get('email').value;
        this.storageService.saveUser(this.user);
        this.emailForm.disable();
      },
      error => {
        console.log(error);
      }
    );
  }

  saveFIO() {
    const firstName = this.fioForm.get('firstName').value;
    const lastName = this.fioForm.get('lastName').value;
    const middleName = this.fioForm.get('middleName').value;
    this.userService.saveFIO(firstName, lastName, middleName).subscribe(
      response => {
        console.log(response);
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.middleName = middleName;
        this.storageService.saveUser(this.user);
        this.fioForm.disable();
      },
      error => {
        console.log(error);
      }
    );
  }

  saveCar() {
    const car = Object.assign(new Car(), this.user.car);
    car.model = this.carForm.get('model').value;
    car.regNumber = this.carForm.get('regNumber').value;
    car.color = this.carForm.get('color').value;
    this.carService.saveCar(car).subscribe(
      response => {
        console.log(response);
        this.user.car = response;
        this.storageService.saveUser(this.user);
        this.carForm.disable();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser() {
    this.userService.deleteUser().subscribe(
      response => {
        console.log(response);
        this.storageService.signOut();
        this.router.navigateByUrl('/auth/signin').then();
      },
      error => {
        console.log(error);
      }
    );
  }
}
