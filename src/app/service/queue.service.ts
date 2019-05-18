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

  public getAllPlaceInQueueFVActive(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(api.QUEUE_FV_ALL_ACTIVE_PATH);
  }

  public getAllPlaceInQueueVFActive(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(api.QUEUE_VF_ALL_ACTIVE_PATH);
  }

  public getPlaceInQueueFVByDriver(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_FV_DRIVER_PATH);
  }

  public getPlaceInQueueVFByDriver(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_VF_DRIVER_PATH);
  }

  public getPlaceInQueueFVByPassenger(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_FV_PASSENGER_PATH);
  }

  public getPlaceInQueueVFByPassenger(): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(api.QUEUE_VF_PASSENGER_PATH);
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
