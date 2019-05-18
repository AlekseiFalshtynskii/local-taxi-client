import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';

import { TripService } from '../service/trip.service';
import { StorageService } from '../service/storage.service';
import { Trip } from '../model/trip';
import { User } from '../model/user';
import { Car } from '../model/car';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  trip: Trip;

  trips: Array<Trip>;

  time: string;

  source: Observable<number>;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private tripService: TripService,
              public storageService: StorageService) {
  }

  ngOnInit() {
    this.tripService.getTripActive().subscribe(
      response => {
        console.log(response);
        this.trip = response;
        this.startTimer();
      },
      error => {
        console.log(error);
      }
    );
    this.tripService.getAllTripFinished().subscribe(
      response => {
        console.log(response);
        this.trips = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  startTimer() {
    if (this.trip) {
      const shift = new Date().getTime() - new Date(this.trip.startDT).getTime();
      this.source = timer(0, 1000);
      this.source.subscribe(
        value => {
          this.time = this.datePipe.transform(shift + 1000 * value, 'HH:mm:ss', 'GMT');
        }
      );
    }
  }

  duration(trip: Trip): string {
    const duration = new Date(trip.endDT).getTime() - new Date(trip.startDT).getTime();
    return this.datePipe.transform(duration, 'HH:mm:ss', 'GMT');
  }

  fio(user: User): string {
    return user.firstName
      + (user.lastName ? (' ' + user.lastName) : '')
      + (user.middleName ? (' ' + user.middleName) : '');
  }

  car(car: Car): string {
    return car
      ? ('Автомобиль: ' + ((car.model ? (car.model + ', ') : '')
        + (car.color ? (car.color + ', ') : '')
        + (car.regNumber ? (car.regNumber + ', ') : '')).slice(0, -2))
      : 'Информация об автомобиле отсутствует';
  }

  numberAnonymous(trip: Trip) {
    return Array(trip.numberPassengers - trip.passengers.length);
  }

  finishTrip() {
    this.tripService.finishTrip().subscribe(
      response => {
        console.log(response);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }
}
