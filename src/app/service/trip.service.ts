import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Trip } from '../model/trip';
import * as api from '../api';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {
  }

  public startTrip(): Observable<Trip> {
    return this.http.post<Trip>(api.TRIP_START_PATH, null);
  }

  public finishTrip(): Observable<void> {
    return this.http.post<void>(api.TRIP_FINISH_PATH, null);
  }

  public getTripActive(): Observable<Trip> {
    return this.http.get<Trip>(api.TRIP_ACTIVE_PATH);
  }

  public getAllTripFinished(): Observable<Array<Trip>> {
    return this.http.get<Array<Trip>>(api.TRIP_FINISHED_PATH);
  }
}
