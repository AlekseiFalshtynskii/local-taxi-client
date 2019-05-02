import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlaceInQueue } from '../model/place-in-queue';
import { QueueService } from '../service/queue.service';
import { StorageService } from '../service/storage.service';

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

  constructor(private router: Router,
              private queueService: QueueService,
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
    if (this.storageService.isDriver()) {
      this.queueService.getPlaceInQueueFVByDriverId(this.storageService.getUser().id).subscribe(
        response => {
          console.log(response);
          this.driverInQueueFV = !!response;
        },
        error => {
          console.log(error);
        }
      );
      this.queueService.getPlaceInQueueVFByDriverId(this.storageService.getUser().id).subscribe(
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
      this.queueService.getPlaceInQueueFVByPassengerId(this.storageService.getUser().id).subscribe(
        response => {
          console.log(response);
          this.passengerInQueueFV = !!response;
        },
        error => {
          console.log(error);
        }
      );
      this.queueService.getPlaceInQueueVFByPassengerId(this.storageService.getUser().id).subscribe(
        response => {
          console.log(response);
          this.passengerInQueueVF = !!response;
        },
        error => {
          console.log(error);
        }
      );
    }
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
    return !this.passengerInQueueFV && !this.passengerInQueueVF;
  }

  fio(piq: PlaceInQueue): string {
    return piq.driver.firstName
      + (piq.driver.lastName ? (' ' + piq.driver.lastName) : '')
      + (piq.driver.middleName ? (' ' + piq.driver.middleName) : '');
  }

  car(piq: PlaceInQueue): string {
    return piq.driver.car
      ? ('Автомобиль: ' + ((piq.driver.car.model ? (piq.driver.car.model + ', ') : '')
        + (piq.driver.car.color ? (piq.driver.car.color + ', ') : '')
        + (piq.driver.car.regNumber ? (piq.driver.car.regNumber + ', ') : '')).slice(0, -2))
      : 'Информация об автомобиле отсутствует';
  }

  passengers(piq: PlaceInQueue): string {
    return !piq.numberPassengers || piq.numberPassengers === 0
      ? 'Свободно'
      : piq.numberPassengers === 4
        ? 'Мест нет'
        : 'Мест: ' + (4 - piq.numberPassengers);
  }

  showBtnAddDriverInQueue(): boolean {
    return this.storageService.isDriver() && this.queue && !this.driverInQueueFV && !this.driverInQueueVF;
  }

  showBtnRemoveDriverFromQueue(): boolean {
    return this.storageService.isDriver() && (this.pageQueueFV() && this.driverInQueueFV) || (this.pageQueueVF() && this.driverInQueueVF);
  }

  addDriverInQueue() {
    if (this.pageQueueFV()) {
      this.queueService.addDriverInQueueFV(this.storageService.getUser().id).subscribe(
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
      this.queueService.addDriverInQueueVF(this.storageService.getUser().id).subscribe(
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
      this.queueService.removeDriverFromQueueFV(this.storageService.getUser().id).subscribe(
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
      this.queueService.removeDriverFromQueueVF(this.storageService.getUser().id).subscribe(
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
    const passengerId = this.storageService.isPassenger() ? this.storageService.getUser().id : null;
    if (this.pageQueueFV()) {
      this.queueService.addPassengerInQueueFV(piq.id, passengerId).subscribe(
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
      this.queueService.addPassengerInQueueVF(piq.id, passengerId).subscribe(
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

  removePassengerFromQueue(piq: PlaceInQueue) {
    const passengerId = this.storageService.isPassenger() ? this.storageService.getUser().id : null;
    if (this.pageQueueFV()) {
      this.queueService.removePassengerFromQueueFV(piq.id, passengerId).subscribe(
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
      this.queueService.removePassengerFromQueueVF(piq.id, passengerId).subscribe(
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
}
