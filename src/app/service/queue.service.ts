import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { PlaceInQueue } from '../model/place-in-queue';
import * as api from '../api';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) {
  }

  public getAllPlaceInQueueFV(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(api.QUEUE_FV_ALL_PATH);
  }

  public getAllPlaceInQueueVF(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(api.QUEUE_VF_ALL_PATH);
  }

  public getCurrentPlaceInQueueFV(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_FV_CURRENT_PATHQUEUE_FV_CURRENT_PATH);
  }

  public getCurrentPlaceInQueueVF(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_VF_CURRENT_PATH);
  }

  public addDriverInQueueFV(): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(api.QUEUE_FV_DRIVER_PATH, null);
  }

  public addDriverInQueueVF(): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(api.QUEUE_VF_DRIVER_PATH, null);
  }

  public removeDriverFromQueueFV(): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(api.QUEUE_FV_DRIVER_PATH);
  }

  public removeDriverFromQueueVF(): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(api.QUEUE_VF_DRIVER_PATH);
  }

  public addPassengerInQueueFV(piqId: number): Observable<Array<PlaceInQueue>> {
    if (piqId) {
      return this.http.post<Array<PlaceInQueue>>(`${api.QUEUE_FV_PASSENGER_PATH}?piqId=${piqId}`, null);
    }
    return this.http.post<Array<PlaceInQueue>>(`${api.QUEUE_FV_PASSENGER_PATH}`, null);
  }

  public addPassengerInQueueVF(piqId: number): Observable<Array<PlaceInQueue>> {
    if (piqId) {
      return this.http.post<Array<PlaceInQueue>>(`${api.QUEUE_VF_PASSENGER_PATH}?piqId=${piqId}`, null);
    }
    return this.http.post<Array<PlaceInQueue>>(`${api.QUEUE_VF_PASSENGER_PATH}`, null);
  }

  public removePassengerFromQueueFV(passengerId?: number): Observable<Array<PlaceInQueue>> {
    if (passengerId) {
      return this.http.delete<Array<PlaceInQueue>>(`${api.QUEUE_FV_PASSENGER_PATH}?passengerId=${passengerId}`);
    }
    return this.http.delete<Array<PlaceInQueue>>(`${api.QUEUE_FV_PASSENGER_PATH}`);
  }

  public removePassengerFromQueueVF(passengerId?: number): Observable<Array<PlaceInQueue>> {
    if (passengerId) {
      return this.http.delete<Array<PlaceInQueue>>(`${api.QUEUE_VF_PASSENGER_PATH}?passengerId=${passengerId}`);
    }
    return this.http.delete<Array<PlaceInQueue>>(`${api.QUEUE_VF_PASSENGER_PATH}`);
  }
}
