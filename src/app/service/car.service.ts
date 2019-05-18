import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../model/car';
import * as api from '../api';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  saveCar(car: Car): Observable<Car> {
    return this.http.post<Car>(api.CAR_PATH, car);
  }
}
