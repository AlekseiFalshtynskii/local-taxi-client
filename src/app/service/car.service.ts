import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../model/car';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsPath = 'cars';

  constructor(private http: HttpClient) {
  }

  saveCar(car: Car): Observable<Car> {
    return this.http.post<Car>(BASE_URL + this.carsPath, car);
  }
}
