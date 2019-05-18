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

  driverInQueueFV: boolean;

  driverInQueueVF: boolean;

  passengerInQueueFV: boolean;

  passengerInQueueVF: boolean;

  userInTrip: boolean;

  constructor(private router: Router,
              private queueService: QueueService,
              private tripService: TripService,
              public storageService: StorageService) {
  }

  ngOnInit() {
    if (this.pageQueueFV()) {
      this.queueService.getAllPlaceInQueueFVActive().subscribe(
        response => {
          console.log(response);
          this.queue = response;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.queueService.getAllPlaceInQueueVFActive().subscribe(
        response => {
          console.log(response);
          this.queue = response;
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.storageService.isDriver()) {
      this.queueService.getPlaceInQueueFVByDriver().subscribe(
        response => {
          console.log(response);
          this.driverInQueueFV = !!response;
        },
        error => {
          console.log(error);
        }
      );
      this.queueService.getPlaceInQueueVFByDriver().subscribe(
        response => {
          console.log(response);
          this.driverInQueueVF = !!response;
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.storageService.isPassenger()) {
      this.queueService.getPlaceInQueueFVByPassenger().subscribe(
        response => {
          console.log(response);
          this.passengerInQueueFV = !!response;
        },
        error => {
          console.log(error);
        }
      );
      this.queueService.getPlaceInQueueVFByPassenger().subscribe(
        response => {
          console.log(response);
          this.passengerInQueueVF = !!response;
        },
        error => {
          console.log(error);
        }
      );
    }
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

  passengerFree(): boolean {
    return !this.passengerInQueueFV && !this.passengerInQueueVF && !this.userInTrip;
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
    return this.storageService.isDriver() && this.queue && !this.driverInQueueFV && !this.driverInQueueVF && !this.userInTrip;
  }

  showBtnRemoveDriverFromQueue(): boolean {
    return this.storageService.isDriver() && (this.pageQueueFV() && this.driverInQueueFV) || (this.pageQueueVF() && this.driverInQueueVF);
  }

  addDriverInQueue() {
    if (this.pageQueueFV()) {
      this.queueService.addDriverInQueueFV().subscribe(
        response => {
          console.log(response);
          this.queue = response;
          this.driverInQueueFV = true;
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
          this.driverInQueueVF = true;
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
          this.driverInQueueFV = false;
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
          this.driverInQueueVF = false;
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
          this.passengerInQueueFV = true;
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
          this.passengerInQueueVF = true;
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
          this.passengerInQueueFV = false;
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
          this.passengerInQueueVF = false;
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
