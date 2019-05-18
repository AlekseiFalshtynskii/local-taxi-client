import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlaceInQueue } from '../model/place-in-queue';
import { QueueService } from '../service/queue.service';
import { StorageService } from '../service/storage.service';
import { TripService } from '../service/trip.service';
import { Car } from '../model/car';
import { User } from '../model/user';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  queue: Array<PlaceInQueue>;

  userInQueueFV: boolean;

  userInQueueVF: boolean;

  userInTrip: boolean;

  constructor(private router: Router,
              private queueService: QueueService,
              private tripService: TripService,
              public storageService: StorageService) {
  }

  ngOnInit() {
    if (this.pageQueueFV()) {
      this.queueService.getAllPlaceInQueueFV().subscribe(
        response => {
          console.log(response);
          this.queue = response;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.getAllPlaceInQueueVF().subscribe(
        response => {
          console.log(response);
          this.queue = response;
        },
        error => {
          console.log(error);
        }
      );
    }
    this.queueService.getCurrentPlaceInQueueFV().subscribe(
      response => {
        console.log(response);
        this.userInQueueFV = !!response;
      },
      error => {
        console.log(error);
      }
    );
    this.queueService.getCurrentPlaceInQueueVF().subscribe(
      response => {
        console.log(response);
        this.userInQueueVF = !!response;
      },
      error => {
        console.log(error);
      }
    );
    this.tripService.getTripActive().subscribe(
      response => {
        console.log(response);
        this.userInTrip = !!response;
      },
      error => {
        console.log(error);
      }
    );
  }

  pageQueueFV() {
    return this.router.url === '/queue/f/v';
  }

  pageQueueVF() {
    return this.router.url === '/queue/v/f';
  }

  driverInPiq(piq: PlaceInQueue): boolean {
    return this.storageService.isDriver() && piq.driver.id === this.storageService.getUser().id;
  }

  passengerInPiq(piq: PlaceInQueue): boolean {
    return !!piq.passengers.find(passenger => {
      return passenger.id === this.storageService.getUser().id;
    });
  }

  userFree(): boolean {
    return !this.userInQueueFV && !this.userInQueueVF && !this.userInTrip;
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

  passengers(piq: PlaceInQueue): string {
    return !piq.numberPassengers || piq.numberPassengers === 0
      ? 'Свободно'
      : piq.numberPassengers === 4
        ? 'Мест нет'
        : 'Мест: ' + (4 - piq.numberPassengers);
  }

  numberAnonymous(piq: PlaceInQueue) {
    return Array(piq.numberPassengers - piq.passengers.length);
  }

  showBtnAddDriverInQueue(): boolean {
    return this.storageService.isDriver() && this.queue && this.userFree();
  }

  showBtnRemoveDriverFromQueue(): boolean {
    return this.storageService.isDriver() && ((this.pageQueueFV() && this.userInQueueFV) || (this.pageQueueVF() && this.userInQueueVF));
  }

  showBtnRemovePassengerFromQueue(): boolean {
    return this.storageService.isPassenger() && ((this.pageQueueFV() && this.userInQueueFV) || (this.pageQueueVF() && this.userInQueueVF));
  }

  addDriverInQueue() {
    if (this.pageQueueFV()) {
      this.queueService.addDriverInQueueFV().subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueFV = true;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.addDriverInQueueVF().subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueVF = true;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeDriverFromQueue() {
    if (this.pageQueueFV()) {
      this.queueService.removeDriverFromQueueFV().subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueFV = false;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.removeDriverFromQueueVF().subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueVF = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  addPassengerInQueue(piq: PlaceInQueue) {
    if (this.pageQueueFV()) {
      this.queueService.addPassengerInQueueFV(piq.id).subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueFV = true;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.addPassengerInQueueVF(piq.id).subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueVF = true;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removePassengerFromQueue(passengerId?: number) {
    if (this.pageQueueFV()) {
      this.queueService.removePassengerFromQueueFV(passengerId).subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueFV = false;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.removePassengerFromQueueVF(passengerId).subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.userInQueueVF = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  startTrip() {
    this.tripService.startTrip().subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl('trips').then();
      },
      error => {
        console.log(error);
      }
    );
  }
}
